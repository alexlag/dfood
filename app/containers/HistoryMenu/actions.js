import {
  SET_ITEMS,
} from './constants';

export function setItems(payload) {
  return {
    type: SET_ITEMS,
    payload,
  };
}
