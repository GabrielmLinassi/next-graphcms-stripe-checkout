import { formatPrice } from "./helper";

const Total = ({ products, cart }) => {
  var total = 0;

  products.forEach((product) => {
    const item = cart.find((cartItem) => cartItem.slug === product.slug);
    const quantity = item?.quantity || 0;
    total = total + quantity * product.price;
  });

  return (
    <div className="font-bold text-xl mr-5">Total {formatPrice(total)}</div>
  );
};

export { Total };
