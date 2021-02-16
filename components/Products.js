import { CartContext } from "contexts/CartProvider";
import Image from "next/image";
import { useContext } from "react";
import { CartLayout } from "./CartLayout";
import { formatPrice } from "./helper";

const Products = ({ products, cart, removeCartItem }) => {
  const { dispatch } = useContext(CartContext);

  const getQuantity = (slug) =>
    cart.find((item) => item.slug === slug)?.quantity || 0;

  return products.map(({ id, slug, name, price, images }) => {
    const removeCartItemHandler = () => {
      dispatch(removeCartItem({ slug }));
    };

    return (
      <CartLayout key={id}>
        <div className="flex items-center gap-5">
          <Image src={images[0].url} width={150} height={150} />
          <div className="flex flex-col items-start">
            {getQuantity(slug)} x {name}
            <div className="font-bold">{formatPrice(price)}</div>
            <a onClick={removeCartItemHandler}>Remove Item</a>
          </div>
        </div>
      </CartLayout>
    );
  });
};

export { Products };
