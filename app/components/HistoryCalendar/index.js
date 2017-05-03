import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

function padNum(num) {
  return `0${num}`.substr(-2, 2);
}

const HistoryCalendar = ({ history }) =>
  <ul>
    {
      history.map((info) => {
        const { day, month, year } = info.toJS();
        const str = `${padNum(day)}.${padNum(month)}.${year}`;
        return (
          <li key={str}>
            <Link to={`/history/${year}/${month}/${day}`}>{str}</Link>
          </li>
        );
      })
    }
  </ul>;

HistoryCalendar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default HistoryCalendar;
