import api from "./../utils/api";

export default async function (req, res) {
  const { checkoutId } = req.query;
  const { user, cardToken, paymentMethodId } = req.body;

  try {
    const { data } = await api.post(`/checkouts/${checkoutId}`, {
      customer: {
        email: user.name,
        firstname: user.nickname,
        lastname: user.nickname,
      },
      shipping: {
        name: "Gabriel",
        street: "Rua Almirante Barroso, 204",
        town_city: "Palmitinho",
      },
      billing: {
        name: "Gabriel",
        street: "Rua Almirante Barroso, 204",
        town_city: "Palmitinho",
        postal_zip_code: "98430000",
        county_state: "rs",
        country: "brazil",
      },
      payment: {
        gateway: "stripe",
        card: {
          token: cardToken,
        },
        stripe: { payment_method_id: paymentMethodId },
      },
    });
    res.json({ data });
  } catch (error) {
    res.json({ error });
  }
}
