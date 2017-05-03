import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import MenuTable from 'components/MenuTable';
import Calculator from 'components/Calculator';

import { makeSelectMenuItems, makeSelectMenuPick, makeSelectMenuSum } from './selectors';
import * as actions from './actions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  padding-bottom: 3em;
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3em;
  line-height: 3em;
  white-space: nowrap;
  padding-left: 1em;
  background: white;
  border: 1px solid black;
`;

export class Today extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      items,
      selected,
      itemClick,
      sum,
    } = this.props;

    return (
      <Container>
        <Helmet
          title="Today Menu"
          meta={[
            { name: 'description', content: 'Daily Food today menu' },
          ]}
        />
        <Main>
          <MenuTable items={items} selected={selected} itemClick={itemClick} />
        </Main>
        <Footer>
          <Calculator sum={sum} />
        </Footer>
      </Container>
    );
  }
}

Today.propTypes = {
  itemClick: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  sum: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectMenuItems(),
  selected: makeSelectMenuPick(),
  sum: makeSelectMenuSum(),
});

export default connect(mapStateToProps, actions)(Today);
