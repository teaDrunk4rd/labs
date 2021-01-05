import React, {Component} from "react";
import AdminLogForm from "./AdminLogForm";
import TeacherLogForm from "./TeacherLogForm";
import {checkRole} from "../../helpers";
import StudentLog from "./StudentLog";
import {RouteComponentProps} from "react-router-dom";

export interface LogProps extends RouteComponentProps<any> {
    logId: number
}

export default class Log extends Component<any, any> {
    render() {
        return (
            <div>
                {
                    checkRole("ROLE_ADMIN")
                        ? <AdminLogForm logId={this.props.location.state?.logId}
                                        disciplineId={this.props.location.state?.disciplineId}
                                        history={this.props.history}
                                        location={this.props.history.location}
                                        match={this.props.match}/>
                        : checkRole("ROLE_TEACHER")
                        ? <TeacherLogForm logId={this.props.location.state.logId}
                                          history={this.props.history}
                                          location={this.props.history.location}
                                          match={this.props.match}/>
                        : <StudentLog logId={this.props.location.state.logId}
                                      history={this.props.history}
                                      location={this.props.history.location}
                                      match={this.props.match}/>
                }
            </div>
        )
    }
}