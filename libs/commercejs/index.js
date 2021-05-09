import axios from "axios";

export const createOrder = ({ checkoutId, user, cardToken, paymentMethodId }) => {
  const { name, nickname } = user;

  return axios.post(`/api/checkouts/${checkoutId}`, {
    user: {
      name,
      nickname,
    },
    cardToken,
    paymentMethodId,
  });
};

export const getAllProducts = () => {
  return axios.get("/api/products");
};

export const getProduct = (id) => {
  return axios.get(`/api/products/${id}`);
};

export const updateItemCart = (cartId, itemId, quantity) => {
  return axios.put(`/api/carts/${cartId}/items/${itemId}`, { quantity });
};

export const deleteItemCart = (cartId, itemId) => {
  return axios.delete(`/api/carts/${cartId}/items/${itemId}`);
};

export const addItemCart = (cartId, { id, quantity }) => {
  return axios.post(`/api/carts/${cartId}`, { id, quantity });
};

export const createCheckout = (cartId) => {
  return axios.get(`/api/checkouts/${cartId}?type=cart`);
};

export const createCustomer = (email, firstname) => {
  return axios.post("/api/customers", { email, firstname });
};

export const issueToken = (email) => {
  return axios.post(`/api/customers/issue-token`, { email });
};

export const issueJwtToken = (customerId) => {
  return axios.post(`/api/customers/${customerId}/issue-token`);
};

export const listOrders = (customerId) => {
  return axios.get(`/api/customers/${customerId}/orders`);
};

export const createCart = () => {
  return axios.get("/api/carts");
};

export const emptyCart = (cartId) => {
  return axios.delete(`/api/carts/${cartId}/items`);
};

export const retrieveCart = (cartId) => {
  return axios.get(`/api/carts/${cartId}`);
};
