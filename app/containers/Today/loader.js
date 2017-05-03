/**
 * Asynchronously loads the components for Today
 */

import { errorLoading, getAsyncInjectors } from 'utils/asyncInjectors';

export default (store) => {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  return (cb) => {
    const importModules = Promise.all([
      import('containers/Today/reducer'),
      import('containers/Today/sagas'),
      import('containers/Today'),
    ]);

    importModules.then(([reducer, sagas, component]) => {
      injectReducer('today', reducer.default);
      injectSagas(sagas.default);

      cb(component);
    });

    importModules.catch(errorLoading);
  };
};
