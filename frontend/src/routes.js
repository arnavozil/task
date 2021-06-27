import {
    useHistory, Route, Switch, 
    BrowserRouter as Router
} from 'react-router-dom';
import React, { useEffect } from 'react';
import Splash from './components/Splash/Splash';
import Add from './components/Add/Add';
import Auth from './components/Auth/Auth';
import Navigation from './components/Navigation/Navigation';
import All from './components/All/All';

const Routes = () => <Router>
    <Navigation />
    <Switch>    
        <Route path='/' component={Splash} exact />
        <Route path='/add' component={Add} />
        <Route path='/login' component={Auth} />
        <Route path='/register' component={Auth} />
        <Route path='/all' component={All} />
        <Route path='*' component={Almighty} />
    </Switch>
</Router>;

const Almighty = () => {
    const { replace } = useHistory();
    useEffect(() => replace('/'), [replace]);
    return <></>;
}

export default Routes;