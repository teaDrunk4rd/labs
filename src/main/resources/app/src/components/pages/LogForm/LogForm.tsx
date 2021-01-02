import React, {Component} from "react";
import AdminLogForm from "./AdminLogForm";
import TeacherLogForm from "./TeacherLogForm";
import {checkRole} from "../../helpers";

export default class LogForm extends Component<any, any> {
    render (){
        return (
            <div>
                {
                    checkRole("ROLE_ADMIN")
                        ? <AdminLogForm logId={this.props.location.state?.logId}
                                        history={this.props.history}
                                        location={this.props.history.location}
                                        match={this.props.match} />
                        : <TeacherLogForm logId={this.props.location.state.logId}
                                          history={this.props.history}
                                          location={this.props.history.location}
                                          match={this.props.match} />
                }
            </div>
        )
    }
}