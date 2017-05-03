/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import Navigation from 'containers/Navigation';
import Routes from 'routes';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  margin: auto;
`;

const Main = styled.div`
  flex: 1;
`;

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    store: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <Container>
        <Header>
          <Navigation />
        </Header>
        <Main>
          <Routes store={this.props.store} />
        </Main>
      </Container>
    );
  }
}
