import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import tw from "twin.macro";

import { CartLayout } from "components/CartLayout";
import { retrieveCart, emptyCart, updateItemCart, deleteItemCart } from "libs/commercejs";

export default function Cart() {
  const [cookies, setCookie] = useCookies(["cartId"]);
  const [cart, setCart] = useState();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(async () => {
    if (cookies?.cartId) {
      const { data, error } = await retrieveCart(cookies.cartId);

      if (error) {
        console.log({ error });
        return;
      }

      setCart(data.cart);
      setLoading(false);
    }
  }, [cookies]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CartLayout>
      {cart.line_items.map(({ id, product_id, name, quantity, line_total: { raw } }) => (
        <div key={id} tw="text-left border-2 border-black p-3 my-1">
          <div>
            <b>Item:</b> {name}
          </div>
          <div>
            <b>Quantity:</b> {quantity}
          </div>
          <div>
            <b>Price $:</b> {raw}
          </div>
          <div tw="flex gap-1">
            <button onClick={() => deleteItemCart(cart.id, id)} tw="bg-red-500 px-4 py-2">
              Remove Item
            </button>
            <button
              onClick={() => updateItemCart(cart.id, id, quantity - 1)}
              tw="border border-black px-4 py-2"
            >
              Decrease 1
            </button>
            <button
              onClick={() => updateItemCart(cart.id, id, quantity + 1)}
              tw="border border-black px-4 py-2"
            >
              Increment 1
            </button>
          </div>
        </div>
      ))}
      <div tw="text-left">
        <b>Total $:</b> {cart.subtotal.raw}
      </div>
      <div tw="flex gap-2 mt-3">
        <button tw="bg-yellow-500 px-4 py-2" onClick={() => emptyCart(cart.id)}>
          Clear Cart
        </button>
        <button tw="bg-yellow-500 px-4 py-2" onClick={() => router.push("/checkout")}>
          Checkout
        </button>
      </div>
    </CartLayout>
  );
}
