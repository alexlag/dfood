import { createSelector } from 'reselect';

/**
 * Direct selector to the history state domain
 */
const selectHistoryDomain = () => (state) => state.get('history');

/**
 * Other specific selectors
 */


/**
 * Default selector used by History
 */

const makeSelectHistory = () => createSelector(
  selectHistoryDomain(),
  (substate) => substate.toJS()
);

export default makeSelectHistory;
export {
  selectHistoryDomain,
};
