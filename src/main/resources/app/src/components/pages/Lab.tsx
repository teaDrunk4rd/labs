import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {getGradeBasedClassName} from "../../App";
import {store} from "react-notifications-component";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";


interface LabState {
    id: number,
    logId: number,
    disciplineName: string,

    name: string,
    issueDate?: Date,
    expectedCompletionDate?: Date,
    scores: number,
    students: Array<any>,
    isLoaded: boolean
}

export default class Lab extends Component<any, LabState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.location.state.id,
            logId: props.location.state.logId,
            disciplineName: props.location.state.disciplineName,
            name: '',
            issueDate: new Date(),
            expectedCompletionDate: undefined,
            scores: 0,
            students: [],
            isLoaded: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateScores = this.updateScores.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== undefined)
            axios.get(`labs/lab?id=${this.state.id}`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        name: response.data.name,
                        issueDate: response.data.issueDate,
                        expectedCompletionDate: response.data.expectedCompletionDate,
                        scores: response.data.scores,
                        students: response.data.students,
                        isLoaded: true
                    })
                }
            });
        else
            axios.get(`labs/lab/students?logId=${this.state.logId}`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        students: response.data,
                        isLoaded: true
                    })
                }
            });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.id !== undefined)
            axios.put('labs/lab/update', {
                id: this.state.id,
                name: this.state.name,
                issueDate: this.state.issueDate,
                expectedCompletionDate: this.state.expectedCompletionDate,
                scores: this.state.scores,
                students: this.state.students,
                logId: this.state.logId
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Изменения сохранены",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({
                        pathname: '/logs/log',
                        search: `?logId=${this.state.logId}`,
                        state: { logId: this.state.logId }
                    })
                }
            });
        else
            axios.put('labs/lab/create', {
                name: this.state.name,
                issueDate: this.state.issueDate,
                expectedCompletionDate: this.state.expectedCompletionDate,
                scores: this.state.scores,
                students: this.state.students,
                logId: this.state.logId
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Лаба создана",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({
                        pathname: '/logs/log',
                        search: `?logId=${this.state.logId}`,
                        state: { logId: this.state.logId }
                    })
                }
            });
    }

    updateScores(event: any) {
        this.state.students.forEach(s => {
            if (s.completionScore === this.state.scores && s.completionScore > 0)
                s.completionScore = event.target.value;
        })
        this.setState({scores: event.target.value});
        store.addNotification({
            title: "Баллы изменены",
            message: "Проверьте баллы студентов",
            type: "info",
            container: "top-right",
            dismiss: { duration: 2000, onScreen: true }
        });
    }

    render() {
        let {disciplineName, name, issueDate, expectedCompletionDate, scores, students} = this.state;
        return (
            <div className="col-10 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
                    <div className="card-header">Лабораторная для предмета {disciplineName}</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} autoComplete='false'>
                            <div className="row mb-2">
                                <div className="row">
                                    <label className="offset-md-2 col-md-4 col-form-label text-left">Наименование</label>
                                </div>

                                <div className="offset-md-2 col-md-7">
                                    <input type="text"
                                           autoComplete="false"
                                           value={name}
                                           onChange={event => this.setState({name: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-2 col-form-label text-left">Дата выдачи</label>
                                <label className="col-md-3 col-form-label text-left">Дата предполагаемой сдачи</label>
                                <label className="col-md-1" />
                                <label className="col-md-1 col-form-label text-left">Баллы</label>

                                <div className="offset-md-2 col-md-2 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={issueDate}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({issueDate: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-md-2 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={expectedCompletionDate}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({expectedCompletionDate: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-md-2" />
                                <div className="col-md-1">
                                    <input type="number"
                                           autoComplete="false"
                                           value={scores}
                                           onChange={this.updateScores}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="col-md-10 m-auto">
                                    <table className="table table-hover mt-3">
                                        <thead className="table-dark">
                                        <tr>
                                            <th>Имя</th>
                                            <th>Email</th>
                                            <th>Дата сдачи</th>
                                            <th>Баллы</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {students && students.map((student, index) => {
                                            return (
                                                <tr className={`cursor-pointer ${getGradeBasedClassName(student.grade)}`}
                                                    key={index}>
                                                    <td>{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td className="col-2 p-0">
                                                        <div className="mt-1 mr-1">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                                                <DatePicker
                                                                    value={student.completionDate}
                                                                    inputVariant="outlined"
                                                                    onChange={date => {
                                                                        student.completionDate = date;
                                                                        this.forceUpdate();
                                                                    }}
                                                                    format="dd.MM.yyyy"
                                                                    cancelLabel="Отмена"
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                        </div>
                                                    </td>
                                                    <td className="col-1 p-0">
                                                        <input type="number"
                                                               autoComplete="false"
                                                               value={student.completionScore}
                                                               onChange={event => {
                                                                   student.completionScore = event.target.value;
                                                                   if (student.completionDate == null)
                                                                       student.completionDate = new Date();
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
                            </div>

                            <div className="row">
                                <div className="col-md-7 offset-md-2 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}