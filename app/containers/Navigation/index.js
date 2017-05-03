import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid black;
`;

const NavItem = styled(NavLink)`
  flex-grow: 1;
  text-align: center;
  padding: 0.5em;
  text-decoration: none;
  color: grey;

  &.active {
    font-weight: bold;
    border-bottom: 0.2em solid grey;
  }

  &:not(:last-child) {
    border-right: 1px solid grey;
  }
`;

export class Navigation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Container>
        <NavItem to="/" exact>
          <FormattedMessage {...messages.today} />
        </NavItem>
        <NavItem to="/history" >
          <FormattedMessage {...messages.history} />
        </NavItem>
      </Container>
    );
  }
}

export default Navigation;
