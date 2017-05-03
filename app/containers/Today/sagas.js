import { call, put, spawn } from 'redux-saga/effects';

import * as API from 'api/main';
import { setItems } from './actions';

export function* getItems() {
  const response = yield call(API.getMenuItems);
  if (response.data) {
    yield put(setItems(response.data));
  }
}

export function* mainFlow() {
  yield spawn(getItems);
}

// All sagas to be loaded
export default [
  mainFlow,
];
