/**
*
* Calculator
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const PriceDisplay = styled.div`
  &::after {
    content: ' ₽';
  }

  span::after {
    content: ':';
    padding-right: 1em;
  }
`;

class Calculator extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      sum,
    } = this.props;

    if (sum === 0) {
      return <FormattedMessage {...messages.noSelection} />;
    }

    return (
      <PriceDisplay>
        <FormattedMessage {...messages.total} />{this.props.sum}
      </PriceDisplay>
    );
  }
}

Calculator.propTypes = {
  sum: PropTypes.number.isRequired,
};

export default Calculator;
