import React, {Component} from "react";
import {checkRole} from "../../helpers";
import {RouteComponentProps} from "react-router-dom";
import Logs from "./Logs";
import StudentLogs from "./StudentLogs";

export interface LogProps extends RouteComponentProps<any> {
    logId: number
}

export default class LogsHub extends Component<any, any> {
    render() {
        return (
            <div>
                {
                    checkRole("ROLE_STUDENT")
                        ? <StudentLogs history={this.props.history}
                                       location={this.props.history.location}
                                       match={this.props.match}/>
                        : <Logs history={this.props.history}
                                location={this.props.history.location}
                                match={this.props.match}/>
                }
            </div>
        )
    }
}