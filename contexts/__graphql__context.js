import { createContext, useEffect, useState } from "react";
import { useAuth } from "contexts/auth";
import { gql, GraphQLClient } from "graphql-request";

export const Context = createContext();
const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

const fetchCart = gql`
  query fetchCart($customerId: String!) {
    cart(where: { customerId: $customerId }) {
      customerId
      cartItems {
        quantity
        product {
          slug
        }
      }
    }
  }
`;

const createCartItem = gql`
  mutation createCartItem($data: CartItemCreateInput!) {
    createCartItem(data: $data) {
      id
    }
  }
`;

const createCart = gql`
  mutation createCart($data: CartCreateInput!) {
    createCart(data: $data) {
      id
    }
  }
`;

const deleteCartItems = gql`
  mutation deleteCartItems($data: CartItemManyWhereInput!) {
    deleteManyCartItemsConnection(where: $data) {
      pageInfo {
        pageSize
      }
    }
  }
`;

const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const [hasCart, setHasCart] = useState(false);

  useEffect(async () => {
    if (!user) {
      return;
    }

    const { cart: graphCMSCart } = await graphcms.request(fetchCart, {
      customerId: user.sub,
    });

    setHasCart(graphCMSCart?.cartItems);
    setCart(graphCMSCart?.cartItems || []);
  }, [user]);

  useEffect(async () => {
    if (!user) {
      return;
    }

    if (hasCart) {
      if (cart.length < 1) {
        return;
      }

      console.log("cart", cart);
      // remove all cart items first
      await graphcms.request(deleteCartItems, {
        data: {
          cart: {
            customerId: user.sub,
          },
        },
      });

      const cartPromises = cart.map((cartItem) =>
        graphcms.request(createCartItem, {
          data: {
            cart: {
              connect: {
                customerId: user.sub,
              },
            },
            quantity: cartItem.quantity,
            product: {
              connect: {
                slug: cartItem.slug,
              },
            },
          },
        })
      );
      await Promise.all(cartPromises);

      await graphcms.request(
        gql`
          mutation publishCartItem($data: CartItemManyWhereInput!) {
            publishManyCartItemsConnection(where: $data) {
              pageInfo {
                pageSize
              }
            }
          }
        `,
        {
          data: {
            cart: {
              customerId: user.id,
            },
          },
        }
      );
    } else {
      await graphcms.request(createCart, {
        data: {
          customerId: user.sub,
          cartItems: {
            create: cart.map((cartItem) => ({
              quantity: cartItem.quantity,
              product: { connect: { slug: cartItem.slug } },
            })),
          },
        },
      });

      await graphcms.request(
        gql`
          mutation publishCart($customerId: String!) {
            publishCart(where: { customerId: $customerId }, to: PUBLISHED) {
              stage
            }
          }
        `,
        {
          customerId: user.sub,
        }
      );
    }
  }, [cart]);

  const addCart = (slug, quantity) => {
    setCart([...cart, { slug, quantity }]);
  };

  const clearCart = () => {};

  return (
    <Context.Provider value={{ cart, addCart }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
