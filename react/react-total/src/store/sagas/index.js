
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_GOODS_LIST, FETCH_GOODS } from '../actions'
import { getGoods } from '../../Api';

function* getGoodsList() {
  try {
    const goodsData = yield call(getGoods);
    yield put({
      type: GET_GOODS_LIST,
      list: goodsData.goodslist
    });
  } catch (error) {

  }
}


function* rootSaga() {
  yield takeLatest(FETCH_GOODS, getGoodsList);
}

export default rootSaga;


