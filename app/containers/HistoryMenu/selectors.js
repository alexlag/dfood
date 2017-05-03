import { createSelector } from 'reselect';

/**
 * Direct selector to the today state domain
 */
const selectMenuDomain = () => (state) => state.get('historyMenu');

/**
 * Other specific selectors
 */
const makeSelectMenuItems = () => createSelector(
  selectMenuDomain(),
  (substate) => substate.get('items')
);

/**
 * Default selector used by Menu
 */

const makeSelectMenu = () => createSelector(
  selectMenuDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMenu;
export {
  selectMenuDomain,
  makeSelectMenuItems,
};
