//Modules
import React from 'react';
import { Container } from '@material-ui/core';
//Components
import {
    Header,
    UserDetails,
    Users
} from '../';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';


const AppRouter = () => (
    <Container>
        <Router>
            <Header />
            <Switch>
                <Route exact path={'/'} component={Users} />
                <Route exact path={'/user/:id'} component={UserDetails} />
            </Switch>
        </Router>
    </Container>
);

export default AppRouter;
