import { createSelector } from 'reselect';

/**
 * Direct selector to the today state domain
 */
const selectMenuDomain = () => (state) => state.get('today');

/**
 * Other specific selectors
 */
const makeSelectMenuItems = () => createSelector(
  selectMenuDomain(),
  (substate) => substate.get('items')
);

const makeSelectMenuPick = () => createSelector(
  selectMenuDomain(),
  (substate) => substate.get('selected')
);

const makeSelectMenuSum = () => createSelector(
  selectMenuDomain(),
  (substate) => substate.get('sum')
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
  makeSelectMenuPick,
  makeSelectMenuSum,
};
