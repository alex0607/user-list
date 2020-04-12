//Modules
import React, { PureComponent } from 'react';
import styled from 'styled-components';
//Components
import {
  Header,
  UserDetails,
  UsersList
} from '../';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';


const Main = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class AppRouter extends PureComponent {
  render() {
    return (
      <Main>
          <Router>
              <Header />
              <Switch>
                  <Route exact path={'/'} component={UsersList} />
                  <Route exact path={'/user/:id'} component={UserDetails} />
              </Switch>
          </Router>
      </Main>
    );
  }
}

export default AppRouter;
