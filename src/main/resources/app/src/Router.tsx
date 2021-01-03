import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import NavMenu from "./components/NavMenu";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import StudentDisciplines from "./components/pages/StudentDisciplines";
import Discipline from "./components/pages/Discipline";
import Logs from "./components/pages/Logs";
import Calendar from "./components/pages/Calendar";
import LabForm from "./components/pages/LabForm";
import StudentForm from "./components/pages/StudentForm";
import LogForm from "./components/pages/LogForm/LogForm";
import Groups from "./components/pages/Groups";
import GroupForm from "./components/pages/GroupForm";


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

                        <PrivateRoute exact path="/disciplines" component={StudentDisciplines} roles="ROLE_STUDENT"/>
                        <PrivateRoute exact path="/disciplines/discipline" component={Discipline} roles="ROLE_STUDENT"/>

                        <PrivateRoute exact path="/logs" component={Logs} roles="ROLE_ADMIN,ROLE_TEACHER"/>
                        <PrivateRoute exact path="/logs/log" component={LogForm} roles="ROLE_ADMIN,ROLE_TEACHER"/>
                        <PrivateRoute exact path="/logs/log/lab" component={LabForm} roles="ROLE_TEACHER"/>
                        <PrivateRoute exact path="/logs/log/student" component={StudentForm} roles="ROLE_TEACHER"/>

                        <PrivateRoute exact path="/groups" component={Groups} roles="ROLE_ADMIN"/>
                        <PrivateRoute exact path="/groups/group" component={GroupForm} roles="ROLE_ADMIN"/>
                    </Switch>
                </div>
            </div>
        );
    }
}