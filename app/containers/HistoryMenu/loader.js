/**
 * Asynchronously loads the components for HistoryMenu
 */

import { errorLoading, getAsyncInjectors } from 'utils/asyncInjectors';

export default (store) => {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  return (cb) => {
    const importModules = Promise.all([
      import('containers/HistoryMenu/reducer'),
      import('containers/HistoryMenu/sagas'),
      import('containers/HistoryMenu'),
    ]);

    importModules.then(([reducer, sagas, component]) => {
      injectReducer('historyMenu', reducer.default);
      injectSagas(sagas.default);

      cb(component);
    });

    importModules.catch(errorLoading);
  };
};
