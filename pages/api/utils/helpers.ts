import api from "../utils/api";

export const asyncTryCatch = async (tryer) => {
  try {
    const { data } = await tryer();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const UPDATE_ITEM_CART = (cartId, itemId, quantity) => async () =>
  await api.put(`/carts/${cartId}/items/${itemId}`, { quantity });

export const DELETE_ITEM_CART = (cartId, itemId) => async () =>
  await api.delete(`/carts/${cartId}/items/${itemId}`);

export const DELETE_ITEMS_CART = (cartId) => async () => await api.delete(`/carts/${cartId}/items`);

export const ADD_ITEM_CART = (cartId, id, quantity) => async () =>
  await api.post(`/carts/${cartId}`, { id, quantity });

export const RETRIEVE_CART = (cartId) => async () => await api.get(`/carts/${cartId}`);

export const CREATE_CART = async () => await api.get("/carts");
