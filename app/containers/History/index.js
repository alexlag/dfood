import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import HistoryCalendar from 'components/HistoryCalendar';

import { makeGroupedHistory } from './selectors';

export class History extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="History"
          meta={[
            { name: 'description', content: 'Available DailyFood menu history' },
          ]}
        />
        <HistoryCalendar history={this.props.history} />
      </div>
    );
  }
}

History.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  history: makeGroupedHistory(),
});

export default connect(mapStateToProps)(History);
