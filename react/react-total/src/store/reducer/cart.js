import { ADD_CART } from '../actions'

const defaultState = {
  cartList: []
}

// 加入购物车
const addcart = (state, goods) => {
  let { cartList } = state;
  let cartGoods = cartList.find(val => val.gid === goods.gid);
  if (cartGoods) {
    cartGoods.totalnum += 1;
    cartGoods.totalprice += cartGoods.price;
  } else {
    cartList.push({ totalprice: goods.price, ...goods });
  }
  return {
    ...state,
    cartList
  }
}


const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CART:
      return addcart(state, action.goods);
    default:
      return state;
  }
}

export default cartReducer;