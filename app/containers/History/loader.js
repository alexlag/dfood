/**
 * Asynchronously loads the components for History
 */

import { errorLoading, getAsyncInjectors } from 'utils/asyncInjectors';

export default (store) => {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  return (cb) => {
    const importModules = Promise.all([
      import('containers/History/reducer'),
      import('containers/History/sagas'),
      import('containers/History'),
    ]);

    importModules.then(([reducer, sagas, component]) => {
      injectReducer('history', reducer.default);
      injectSagas(sagas.default);

      cb(component);
    });

    importModules.catch(errorLoading);
  };
};
