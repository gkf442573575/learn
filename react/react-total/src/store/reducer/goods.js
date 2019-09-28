import { GET_GOODS_LIST } from '../actions'

const defaultState = {
  goodsList: []
}

const goodsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_GOODS_LIST:
      return {
        ...state,
        goodsList: action.list
      }
    default:
      return state;
  }
}
export default goodsReducer;