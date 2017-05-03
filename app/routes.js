import React from 'react';
import { Switch } from 'react-router';

import AsyncRoute from 'routing/AsyncRoute';
import createTodayLoader from 'containers/Today/loader';
import createHistoryLoader from 'containers/History/loader';
import createHistoryMenuLoader from 'containers/HistoryMenu/loader';
import createNotFoundPageLoader from 'containers/NotFoundPage/loader';

const Routes = ({ store }) => (
  <Switch>
    <AsyncRoute
      exact path="/" load={createTodayLoader(store)}
    />
    <AsyncRoute
      exact path="/history" load={createHistoryLoader(store)}
    />
    <AsyncRoute
      path="/history/:year/:month/:day" load={createHistoryMenuLoader(store)}
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
