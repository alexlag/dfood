import { fromJS, Map } from 'immutable';
import {
  SET_ITEMS,
} from './constants';

const initialState = new Map({
  items: new Map(),
});

function updateOnItems(state, arr) {
  return state.set('items', fromJS(arr).groupBy((v) => v.get('type')));
}

export default function items(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return updateOnItems(state, action.payload);
    default:
      return state;
  }
}
