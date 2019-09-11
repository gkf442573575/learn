import { ADD_CART, REMOVE_CART, CLEAR_CART, GET_GOODS_LIST, GET_GOODS_INFO } from '../actions'

const defaultState = {
  cartList: [],
  goodsList: [],
  goodsinfo: []
}


// 加入购物车
const addcart = (state, gid) => {
  let { cartList, goodsList } = state;
  let cartGoods = cartList.find(val => val.gid === gid);
  if (cartGoods) {
    cartGoods.totalnum += 1;
    cartGoods.totalprice += cartGoods.price;
  } else {
    const addGoods = goodsList.find(val => val.gid === gid);
    cartList.push({ totalprice: addGoods.price, ...addGoods });
  }
  return {
    ...state,
    cartList
  }
}



const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CART:
      return addcart(state, action.gid);
    default:
      return state;
  }
}


export default reducer;




