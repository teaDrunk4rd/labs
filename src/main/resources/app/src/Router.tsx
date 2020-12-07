import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Disciplines from "./components/pages/Disciplines";
import Discipline from "./components/pages/Discipline";
import PrivateRoute from "./components/PrivateRoute";


export class Router extends Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <div className='container'>
                    {this.props.children}
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <PrivateRoute exact path="/profile" component={Profile}/>
                        <PrivateRoute exact path="/disciplines" component={Disciplines} roles="ROLE_STUDENT"/>
                        <PrivateRoute exact path="/disciplines/discipline" component={Discipline} roles="ROLE_STUDENT"/>
                    </Switch>
                </div>
            </div>
        );
    }
}