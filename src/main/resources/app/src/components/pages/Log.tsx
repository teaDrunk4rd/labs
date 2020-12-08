import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {formatDate, getGradeBasedClassName} from "../../App";


interface LogState {
    id: number,
    name: string,
    type: string,
    description: string,
    labs: Array<any>,
    students: Array<any>,
    isLoaded: boolean
}

export default class Log extends Component<any, LogState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.location.state.logId,
            name: '',
            type: '',
            description: '',
            labs: [],
            students: [],
            isLoaded: false
        };
        this.updateDescription = this.updateDescription.bind(this);
    }

    componentDidMount() {
        axios.get(`logs/log?id=${this.state.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    name: response.data.name,
                    type: response.data.type,
                    description: response.data.description
                })
            }
        });
        axios.get(`students?logId=${this.state.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    students: response.data,
                    isLoaded: true
                })
            }
        });
        axios.get(`labs?logId=${this.state.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    labs: response.data,
                    isLoaded: true
                })
            }
        });
        window.addEventListener("beforeunload", this.updateDescription);
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.updateDescription);
    }

    updateDescription(event: any) {
        axios.put('logs/log/update', {
            id: this.state.id,
            description: this.state.description
        });
    }

    render() {
        const {name, type, description, labs, students} = this.state;
        return (
            <div className="col-10 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
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
                                   aria-controls="labs" aria-selected="false">Лабораторные</a>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="students" role="tabpanel"
                                 aria-labelledby="students-tab">
                                <table className="table table-hover">
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
                                <table className="table table-hover">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>Наименование</th>
                                        <th>Дата выдачи</th>
                                        <th>Баллы</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {labs && labs.map((lab, index) => {
                                        return (
                                            <tr className="cursor-pointer"
                                                key={index}>
                                                <td>{lab.name}</td>
                                                <td>{lab.issueDate != null ? formatDate(lab.issueDate) : ''}</td>
                                                <td>{lab.scores}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}