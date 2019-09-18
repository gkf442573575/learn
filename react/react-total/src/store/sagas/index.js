
import { call, put, takeLatest } from 'redux-saga';
import { GET_GOODS_LIST } from '../actions'
import Api from '../../Api';

function* getGoods() {
  try {
    const goodslist = yield call(Api.getGoods);
    yield put({
      type: GET_GOODS_LIST,
      list: goodslist
    });
  } catch (error) {

  }
}


function* mySaga() {
  yield takeLatest('getGoods', getGoods);

}

export default mySaga;


