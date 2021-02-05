import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const PayButton = ({ products, full = false }) => {
  const { slug, quantity } = products[0];

  const handleClick = async () => {
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

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-block bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 ${
        full && "w-full"
      } mt-2`}
    >
      Buy
    </button>
  );
};

export { PayButton };
