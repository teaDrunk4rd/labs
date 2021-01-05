import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import NavMenu from "./components/NavMenu";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import StudentLog from "./components/pages/LogForm/StudentLog";
import Calendar from "./components/pages/Calendar";
import LabForm from "./components/pages/LabForm";
import StudentForm from "./components/pages/StudentForm/StudentForm";
import Log from "./components/pages/LogForm/Log";
import Groups from "./components/pages/Groups";
import GroupForm from "./components/pages/GroupForm/GroupForm";
import Users from "./components/pages/Users";
import UserForm from "./components/pages/UserForm";
import Directions from "./components/pages/Directions";
import DirectionForm from "./components/pages/DirectionForm";
import Disciplines from "./components/pages/Disciplines";
import LogsHub from "./components/pages/Logs/LogsHub";
import DisciplineForm from "./components/pages/DisciplineForm";


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

                        <PrivateRoute exact path="/logs" component={LogsHub} roles="ROLE_ADMIN,ROLE_TEACHER,ROLE_STUDENT"/>
                        <PrivateRoute exact path="/logs/log" component={Log} roles="ROLE_ADMIN,ROLE_TEACHER,ROLE_STUDENT"/>
                        <PrivateRoute exact path="/logs/log/lab" component={LabForm} roles="ROLE_TEACHER"/>
                        <PrivateRoute exact path="/logs/log/student" component={StudentForm} roles="ROLE_TEACHER"/>

                        <PrivateRoute exact path="/users" component={Users} roles="ROLE_ADMIN"/>
                        <PrivateRoute exact path="/users/user" component={UserForm} roles="ROLE_ADMIN"/>

                        <PrivateRoute exact path="/groups" component={Groups} roles="ROLE_ADMIN"/>
                        <PrivateRoute exact path="/groups/group" component={GroupForm} roles="ROLE_ADMIN"/>

                        <PrivateRoute exact path="/directions" component={Directions} roles="ROLE_ADMIN"/>
                        <PrivateRoute exact path="/directions/direction" component={DirectionForm} roles="ROLE_ADMIN"/>

                        <PrivateRoute exact path="/disciplines" component={Disciplines} roles="ROLE_ADMIN"/>
                        <PrivateRoute exact path="/disciplines/discipline" component={DisciplineForm} roles="ROLE_ADMIN"/>
                    </Switch>
                </div>
            </div>
        );
    }
}