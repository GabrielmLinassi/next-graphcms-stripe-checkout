import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "X-Authorization": "sk_test_253819e270b95cdf86db638032063655b85138227deab",
  },
  baseURL: "https://api.chec.io/v1",
});

export const createCustomer = (email, firstname) => {
  return Promise.resolve(
    api
      .post("/customers", { email, firstname })
      .then((res) => ({ data: res, error: null }))
      .catch((err) => ({ data: null, error: err }))
  );
};

export const issueToken = (email) => {
  return Promise.resolve(
    api
      .post(`/customers/issue-token`, { email, base_url: "{token}" })
      .then((res) => ({ data: res, error: null }))
      .catch((err) => ({ data: null, error: err.response.data.error }))
  );
};

export const issueJwtToken = (customerId) => {
  return api.post(`/customers/${customerId}/issue-token`);
};

export const createOrder = (
  checkoutId,
  customerId,
  { stripe: { cardToken, paymentMethodId, paymentIntentId } }
) => {
  return api.post(`/checkouts/${checkoutId}`, {
    customer: {
      // id: customerId,
      firstname: "Gabriel",
      lastname: "Linassi",
      email: "sample@sample.com",
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
      stripe: { payment_method_id: paymentMethodId /*payment_intent_id: paymentIntentId*/ },
    },
  });
};

export const listOrders = (customerId) => {
  return api.get(`/customers/${customerId}/orders`);
};

export const createCheckout = (cartId) => {
  return api.get(`/checkouts/${cartId}?type=cart`);
};

export const createCart = () => {
  return Promise.resolve(
    api
      .get("/carts")
      .then((res) => ({ data: res, error: null }))
      .catch((err) => ({ data: null, error: err }))
  );
};

export const emptyCart = (cartId) => {
  return api.delete(`/carts/${cartId}/items`);
};

export const retrieveCart = (cartId) => {
  return Promise.resolve(
    api
      .get(`/carts/${cartId}`)
      .then((res) => ({ data: res.data, error: null }))
      .catch((err) => ({ data: null, error: err.response.data.error }))
  );
};

export const addItemCart = (cartId, { id, quantity }) => {
  return Promise.resolve(
    api
      .post(`/carts/${cartId}`, { id, quantity })
      .then((res) => ({ data: res, error: null }))
      .catch((err) => ({ data: null, error: err.response.data.error }))
  );
};

export const deleteItemCart = (cartId, itemId) => {
  return api.delete(`/carts/${cartId}/items/${itemId}`);
};

export const updateItemCart = (cartId, itemId, quantity) => {
  return api.put(`/carts/${cartId}/items/${itemId}`, { quantity });
};

export const getAllProducts = () => {
  return api.get("/products?limit=250");
};

export const getProduct = (id) => {
  return api.get(`/products/${id}`);
};

export default api;
