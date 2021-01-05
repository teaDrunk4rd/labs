import React, {Component} from "react";
import axios from "axios";
import {formatDate} from "../../helpers";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import Preloader from "../../Preloader";

interface StudentLogsProps{
    studentId: number,
    logId: number
}

interface StudentLogsState {
    logs: Array<{
        logId: number,
        disciplineName: string,
        grade: string,
        labs: Array<any>
    }>,
    isLoaded: boolean
}

export default class StudentLogs extends Component<StudentLogsProps, StudentLogsState> {
    constructor(props: StudentLogsProps) {
        super(props);
        this.state = {
            logs: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get(`students/student/logs?studentId=${this.props.studentId}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    logs: response.data,
                    isLoaded: true
                })
            }
        });
    }

    render() {
        return (
            <div>
                {!this.state.isLoaded && <Preloader className='form-loader'/>}
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {this.state.logs && this.state.logs.map((log, index) => {
                        return (
                            <li className="nav-item" key={index}>
                                <a className={`nav-link ${log.logId === this.props.logId ? 'active' : ''}`}
                                   data-toggle="tab"
                                   role="tab"
                                   aria-selected="true"
                                   id={`log-tab-${index}`}
                                   href={`#href-log-tab-${index}`}>
                                    {log.disciplineName}
                                </a>
                            </li>
                        )
                    })}
                </ul>

                <div className="tab-content" id="myTabContent">
                    {this.state.logs && this.state.logs.map((log, logIndex) => {
                        return (
                            <div className={`tab-pane fade ${log.logId === this.props.logId ? 'show active' : ''}`}
                                 role="tabpanel"
                                 key={logIndex}
                                 aria-labelledby={`log-tab-${logIndex}`}
                                 id={`href-log-tab-${logIndex}`}>
                                <div className="my-2 h6">
                                    Предположительная оценка: {log.grade} {/* TODO: Обновлять её при изменении баллов? */}
                                </div>

                                <table className="table table-hover">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>Наименование</th>
                                        <th>Дата выдачи</th>
                                        <th>Дата сдачи план</th>
                                        <th>Баллы</th>
                                        <th>Дата сдачи факт</th>
                                        <th>Полученные баллы</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {log.labs && log.labs.map((lab, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{lab.name}</td>
                                                <td>{lab.issueDate != null ? formatDate(lab.issueDate) : ''}</td>
                                                <td>{lab.expectedCompletionDate != null ? formatDate(lab.expectedCompletionDate) : ''}</td>
                                                <td>{lab.scores}</td>
                                                <td className="col-2 p-0">
                                                    <div className="mr-1">
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                                            <DatePicker
                                                                value={lab.completionDate}
                                                                inputVariant="outlined"
                                                                onChange={date => {
                                                                    if (lab.completionDate === null)
                                                                        lab.completionScores = lab.scores;
                                                                    lab.completionDate = date;
                                                                    this.forceUpdate();
                                                                }}
                                                                format="dd.MM.yyyy"
                                                                cancelLabel="Отмена"
                                                                className="bg-white"
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </div>
                                                </td>
                                                <td className="col-1 p-0">
                                                    <input type="number"
                                                           autoComplete="false"
                                                           value={lab.completionScores}
                                                           onChange={event => {
                                                               lab.completionScores = event.target.value;
                                                               if (lab.completionDate == null)
                                                                   lab.completionDate = new Date();
                                                               this.forceUpdate();
                                                           }}
                                                           className="form-control"/>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    };
}