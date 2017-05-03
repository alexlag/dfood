/*
 *
 * History actions
 *
 */

import {
  SET_HISTORY,
} from './constants';

export function setHistory(payload) {
  return { type: SET_HISTORY, payload };
}
