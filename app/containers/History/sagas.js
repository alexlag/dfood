import { call, put, spawn } from 'redux-saga/effects';

import * as API from 'api/main';
import { setHistory } from './actions';

export function* getItems() {
  const response = yield call(API.history);
  if (response.data) {
    yield put(setHistory(response.data));
  }
}

export function* mainFlow() {
  yield spawn(getItems);
}

// All sagas to be loaded
export default [
  mainFlow,
];
