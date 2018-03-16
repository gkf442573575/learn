import {
  handleActions
} from 'redux-actions'
import {
  INCREMENT,
  DECREMENT,
  ASYNC_INCREMENT,
  UP_NUM,
  UP_ORDER
} from '../types'

export default handleActions({
  [INCREMENT](state) {
    return {
      ...state,
      num: state.num + 1
    }
  },
  [DECREMENT](state) {
    return {
      ...state,
      num: state.num - 1
    }
  },
  [ASYNC_INCREMENT](state, action) {
    return {
      ...state,
      asyncNum: state.asyncNum + action.payload
    }
  },
  [UP_NUM](state, action) {
    console.log('action发射过来了',action);
    console.log('state是啥啊',state);
        
    return {
      ...state,
      myNum: state.myNum + action.payload
    }
  },
  [UP_ORDER](state,action){
    return {
      ...state,
      shelforder:action.payload
    }
  }
}, {
  num: 0,
  asyncNum: 0,
  myNum:0,
  shelforder:{}
})
