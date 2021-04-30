import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { createCart, addItemCart } from "libs/commercejs";
import { useAuth } from "contexts/auth";

const AddCart = ({ variantId, quantity }) => {
  const [cookies, setCookie] = useCookies(["cartId"]);
  const [cart, setCart] = useState();
  const { customerId } = useAuth();

  useEffect(() => {
    if (cookies?.cartId) {
      setCart((prevState) => ({
        ...prevState,
        id: cookies.cartId,
      }));
    }
  }, [cookies]);

  useEffect(() => {
    console.log({ cart });
    if (cart?.id) {
      setCookie("cartId", cart.id, { path: "/" });
    }
  }, [cart, customerId]);

  const addToCart = async (productId, quantity) => {
    let _cartId = null;
    if (!cookies.cartId) {
      const { data } = await createCart();
      _cartId = data.data.id;
      setCart((prevState) => ({
        ...prevState,
        id: data.data.id,
      }));
    }

    await addItemCart(_cartId || cart.id, {
      id: productId,
      quantity,
    });
  };

  const handleClick = () => {
    addToCart(variantId, quantity);
  };

  return (
    <button
      onClick={handleClick}
      tw="inline-block w-full px-4 py-2 mt-2 text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200"
    >
      Add Cart
    </button>
  );
};

export default AddCart;
