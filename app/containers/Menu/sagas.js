import { actionChannel, call, take, put, spawn, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import * as API from 'api/main';
import { ITEM_CLICK } from './constants';
import { setItems } from './actions';

export function* getItems() {
  const response = yield call(API.getMenuItems);
  if (response.data) {
    yield put(setItems(response.data));
  }
}

export function* selectFlow() {
  const chan = yield actionChannel(ITEM_CLICK);
  while (true) { // eslint-disable-line no-constant-condition
    const { payload: item } = yield take(chan);
  }
}

export function* mainFlow() {
  yield spawn(getItems);
  // const watcher = yield fork(selectFlow);
  // yield take(LOCATION_CHANGE);
  // yield cancel(watcher);
}

// All sagas to be loaded
export default [
  mainFlow,
];
