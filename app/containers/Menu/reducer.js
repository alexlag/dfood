/*
 *
 * Menu reducer
 *
 */

import { fromJS, Set, Map } from 'immutable';
import {
  SET_ITEMS,
  ITEM_CLICK,
} from './constants';

const initialState = new Map({
  items: new Map(),
  selected: new Set(),
  sum: 0,
});

function checkSelection(selected, item) {
  if (selected.includes(item)) return selected.remove(item);

  return selected.add(item);
}

function calculateSum(selected) {
  return selected.reduce((ac, item) => ac + item.get('price'), 0);
}

function onItemClick(state, item) {
  const subresult = state.update('selected', (v) => checkSelection(v, fromJS(item)));
  return subresult.set('sum', calculateSum(subresult.get('selected')));
}

export default function items(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return state.set('items', fromJS(action.payload));
    case ITEM_CLICK:
      return onItemClick(state, action.payload);
    default:
      return state;
  }
}
