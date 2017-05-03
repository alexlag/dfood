/**
 * Asynchronously loads the components for Menu
 */

import { errorLoading, getAsyncInjectors } from 'utils/asyncInjectors';

export default (store) => {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  return (cb) => {
    const importModules = Promise.all([
      import('containers/Menu/reducer'),
      import('containers/Menu/sagas'),
      import('containers/Menu'),
    ]);

    importModules.then(([reducer, sagas, component]) => {
      injectReducer('menu', reducer.default);
      injectSagas(sagas.default);

      cb(component);
    });

    importModules.catch(errorLoading);
  };
};
