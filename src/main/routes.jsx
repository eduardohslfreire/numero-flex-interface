import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'
import Main from './main'
import BoxDashboard from '../dashboard/boxDashboard';
import Logout from './logout'
import Login from './login'
import BoxClient from '../client/boxClient';



export default props => (
    <Router history={hashHistory}>   
            <Route path="/" component={Main}>
                <IndexRoute component={BoxClient} />
                <Route path="dashboard" component={BoxDashboard} />
                <Route path="logout" component={Logout} />                
            </Route>
            <Route path="/login" component={Login} />
            <Redirect from='*' to='/' />                  
    </Router>
)


