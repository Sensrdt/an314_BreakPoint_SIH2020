import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import login from './JoinOption';
import guidelines from './Menus/Guidelines/guide';
import history from './history';
import Menus from './Menus';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/login" exact component={login} />
            <Route path="/guidelines" exact component={guidelines} />
            <Route path="/" component={Menus} />
        </Switch>
    </Router>
);

export default Routes;
