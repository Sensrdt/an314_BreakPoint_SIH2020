import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import login from './JoinOption';
import guidelines from './Menus/Guidelines/guide';
import history from './history';
import Menus from './Menus';
import DrugList from './DrugList';

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route path="/login" exact component={login} />
            <Route path="/drugs" exact component={DrugList} />
            <Route path="/" component={Menus} />
        </Switch>
    </Router>
);

export default Routes;
