import { call, select, put } from 'redux-saga/effects';
import { matchPath } from 'react-router-dom';
import * as API from 'api/main';
import { setItems } from './actions';

export function* getItems(params) {
  const response = yield call(API.getMenuItems, params);
  if (response.data) {
    yield put(setItems(response.data));
  }
}

export function* mainFlow() {
  const { pathname } = yield select((state) => state.get('route').location);
  const match = matchPath(pathname, {
    path: '/history/:year/:month/:day',
  });
  if (match && match.params) {
    yield* getItems(match.params);
  }
}

// All sagas to be loaded
export default [
  mainFlow,
];
