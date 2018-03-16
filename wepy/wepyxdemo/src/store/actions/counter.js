import {
  ASYNC_INCREMENT,
  UP_NUM,
  UP_ORDER
} from '../types'
import {
  createAction
} from 'redux-actions'

export const asyncInc = createAction(ASYNC_INCREMENT, () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
});



export const upMyNum = createAction(UP_NUM, (num) => {
  // console.log('upMyNum',num);
  return num;
})


export const upMyOrder = createAction(UP_ORDER,(order)=>{
  return order;
});
