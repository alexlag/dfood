import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import MenuTable from 'components/MenuTable';

import { makeSelectMenuItems } from './selectors';
import * as actions from './actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
`;

export class HistoryMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      items,
    } = this.props;

    return (
      <Container>
        <Helmet
          title="History Menu"
          meta={[
            { name: 'description', content: 'History of DailyFood menu' },
          ]}
        />
        <Main>
          <MenuTable items={items} />
        </Main>
      </Container>
    );
  }
}

HistoryMenu.propTypes = {
  items: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectMenuItems(),
});

export default connect(mapStateToProps, actions)(HistoryMenu);
