/*
 *
 * Menu
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import MenuTable from 'components/MenuTable';
import Calculator from 'components/Calculator';

import { makeSelectMenuItems, makeSelectMenuPick, makeSelectMenuSum } from './selectors';
import { itemClick } from './actions';
import messages from './messages';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  text-align: center;
  width: 100%;
  margin: auto;
  padding: 1em;
  font-size: 150%;
`;

const Main = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  height: auto;
  width: 100%;
  padding: 1em;
  background: white;
  border: 1px solid black;
`;

export class Menu extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
          title="Menu"
          meta={[
            { name: 'description', content: 'Description of Menu' },
          ]}
        />
        <Header><FormattedMessage {...messages.header} /></Header>
        <Main>
          <MenuTable items={items} selected={selected} itemClick={itemClick} />
        </Main>
        <Footer><Calculator sum={sum} /></Footer>
      </Container>
    );
  }
}

Menu.propTypes = {
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

const mapDispatchToProps = {
  itemClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
