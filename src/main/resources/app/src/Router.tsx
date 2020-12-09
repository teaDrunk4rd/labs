import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import NavMenu from "./components/NavMenu";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Disciplines from "./components/pages/Disciplines";
import Discipline from "./components/pages/Discipline";
import Logs from "./components/pages/Logs";
import Log from "./components/pages/Log";
import Calendar from "./components/pages/Calendar";


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
                        <PrivateRoute exact path="/" component={Calendar} roles="ROLE_STUDENT,ROLE_TEACHER"/>
                        <PrivateRoute exact path="/disciplines" component={Disciplines} roles="ROLE_STUDENT"/>
                        <PrivateRoute exact path="/disciplines/discipline" component={Discipline} roles="ROLE_STUDENT"/>
                        <PrivateRoute exact path="/logs" component={Logs} roles="ROLE_TEACHER"/>
                        <PrivateRoute exact path="/logs/log" component={Log} roles="ROLE_TEACHER"/>
                    </Switch>
                </div>
            </div>
        );
    }
}