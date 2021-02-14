import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "contexts/auth";
import { Context } from "contexts/context";
import { useContext } from "react";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const PayButton = ({ products, full = false }) => {
  // const { clearCart } = useContext(Context);
  const { user } = useAuth();

  const handleClick = async () => {
    if (!user) {
      alert("User must be logged in to buy.");
      return;
    }
    const stripe = await stripePromise;

    const session = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products,
      }),
    }).then((res) => res.json());

    // clearCart();

    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-block bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 ${
        full && "w-full"
      }`}
    >
      Buy
    </button>
  );
};

export { PayButton };
