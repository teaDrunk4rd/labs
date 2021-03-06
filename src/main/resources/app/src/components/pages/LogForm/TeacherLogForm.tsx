import React, {Component} from "react";
import axios from "axios";
import Preloader from "../../Preloader";
import {getGradeBasedClassName} from "../../helpers";
import LogLabs from "./LogLabs";
import {LogProps} from "./Log";

interface TeacherLogFormState {
    name: string,
    type: string,
    description: string,
    students: Array<any>,
    isLoaded: boolean
}

export default class TeacherLogForm extends Component<LogProps, TeacherLogFormState> {
    constructor(props: LogProps) {
        super(props);
        this.state = {
            name: '',
            type: '',
            description: '',
            students: [],
            isLoaded: false
        };
        this.updateDescription = this.updateDescription.bind(this);
    }

    componentDidMount() {
        axios.get(`logs/log?id=${this.props.logId}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    name: response.data.name,
                    type: response.data.type,
                    description: response.data.description
                });
                axios.get(`students?logId=${this.props.logId}`).then(response => {
                    if (response.status === 200)
                        this.setState({
                            students: response.data,
                            isLoaded: true
                        })
                });
            }
        });
        window.addEventListener("beforeunload", this.updateDescription);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.updateDescription);
    }

    updateDescription(event: any) {
        axios.put('logs/log/updateDescription', {
            id: this.props.logId,
            description: this.state.description
        });
    }

    render() {
        let {name, type, description, students} = this.state;
        return (
            <div className="col-10 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded && <Preloader className='form-loader'/>}
                    <div className="card-header">{name} ({type})</div>
                    <div className="card-body">
                        <label className="offset-md-2 col-md-6 col-form-label d-flex justify-content-start">Описание</label>
                        <textarea className="mb-2 col-md-8 mx-auto"
                            onBlur={this.updateDescription}
                            onChange={event => this.setState({description: event.target.value})}
                            value={description} />

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="students-tab" data-toggle="tab" href="#students" role="tab"
                                   aria-controls="students" aria-selected="true">Студенты</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="labs-tab" data-toggle="tab" href="#labs" role="tab"
                                    aria-controls="labs" aria-selected="false">
                                    Лабораторные
                                </a>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="students" role="tabpanel"
                                 aria-labelledby="students-tab">
                                <table className="table table-hover mt-3">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>Имя</th>
                                        <th>Email</th>
                                        <th>Баллы</th>
                                        <th>Оценка</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students && students.map((student, index) => {
                                        return (
                                            <tr className={`cursor-pointer ${getGradeBasedClassName(student.grade)}`}
                                                onClick={() => this.props.history.push({
                                                    pathname: '/logs/log/student',
                                                    search: `?id=${student.id}`,
                                                    state: {
                                                        id: student.id,
                                                        logId: this.props.logId
                                                    }
                                                })}
                                                key={index}>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.scores}</td>
                                                <td>{student.grade}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="tab-pane fade" id="labs" role="tabpanel"
                                 aria-labelledby="labs-tab">
                                <LogLabs
                                    logId={this.props.logId}
                                    disciplineName={`${name} (${type})`}
                                    history={this.props.history}
                                    location={this.props.history.location}
                                    match={this.props.match} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}