import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import login from './JoinOption';
import history from './history';
import Menus from './Menus';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/login" exact component={login} />
            <Route path="/" component={Menus} />
        </Switch>
    </Router>
);

export default Routes;
