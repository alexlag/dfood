/*
 *
 * Menu actions
 *
 */

import {
  SET_ITEMS,
  ITEM_CLICK,
} from './constants';

export function setItems(payload) {
  return {
    type: SET_ITEMS,
    payload,
  };
}

export function itemClick(section, idx, price) {
  return {
    type: ITEM_CLICK,
    payload: {
      section,
      idx,
      price,
    },
  };
}
