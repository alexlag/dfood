import React from 'react';
import { Switch } from 'react-router';

import AsyncRoute from 'routing/AsyncRoute';
import createMenuLoader from 'containers/Menu/loader';
// import createHistoryLoader from 'containers/History/loader';
import createNotFoundPageLoader from 'containers/NotFoundPage/loader';

const Routes = ({ store }) => (
  <Switch>
    <AsyncRoute
      exact path="/" load={createMenuLoader(store)}
    />
    <AsyncRoute
      exact path="" load={createNotFoundPageLoader(store)}
    />
  </Switch>
);

Routes.propTypes = {
  store: React.PropTypes.object.isRequired,
};

export default Routes;
