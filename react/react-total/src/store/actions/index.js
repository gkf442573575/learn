
export const ADD_CART = 'ADD_CART';

export const REMOVE_CART = 'REMOVE_CART';

export const CLEAR_CART = 'CLEAR_CART';

export const GET_GOODS_LIST = 'GET_GOODS_LIST';

export const GET_GOODS_INFO = 'GET_GOODS_INFO';


export const addcart = (gid) => ({
  type: ADD_CART,
  gid
});