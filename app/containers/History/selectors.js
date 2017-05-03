import { createSelector } from 'reselect';

/**
 * Direct selector to the history state domain
 */
const selectHistoryDomain = () => (state) => state.get('history');

/**
 * Other specific selectors
 */
const makeGroupedHistory = () => createSelector(
  selectHistoryDomain(),
  (substate) => substate
);

/**
 * Default selector used by History
 */

const makeSelectHistory = () => createSelector(
  selectHistoryDomain(),
  (substate) => substate.toJS()
);

export default makeSelectHistory;
export {
  makeGroupedHistory,
  selectHistoryDomain,
};
