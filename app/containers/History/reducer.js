/*
 *
 * History reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_HISTORY,
} from './constants';

const initialState = fromJS([]);

function historyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_HISTORY:
      return fromJS(action.payload);
    default:
      return state;
  }
}

export default historyReducer;
