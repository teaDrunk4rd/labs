import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {formatDate, getGradeBasedClassName} from "../../App";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {store} from "react-notifications-component";


interface LogState {
    id: number,
    name: string,
    type: string,
    description: string,
    labs: Array<any>,
    selectedLab: any,
    students: Array<any>,
    dialogOpen: boolean,
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
            selectedLab: null,
            labs: [],
            students: [],
            dialogOpen: false,
            isLoaded: false
        };
        this.updateDescription = this.updateDescription.bind(this);
        this.loadLabs = this.loadLabs.bind(this);
        this.deleteLab = this.deleteLab.bind(this);
    }

    componentDidMount() {
        axios.get(`logs/log?id=${this.state.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    name: response.data.name,
                    type: response.data.type,
                    description: response.data.description
                });
                axios.get(`logs/log/students?logId=${this.state.id}`).then(response => {
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

    loadLabs(event: any) {
        axios.get(`labs?logId=${this.state.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    labs: response.data,
                    isLoaded: true
                })
            }
        });
    }

    updateDescription(event: any) {
        axios.put('logs/log/update', {
            id: this.state.id,
            description: this.state.description
        });
    }

    deleteLab(event: any) {
        this.setState({dialogOpen: false});
        axios.delete(`labs/delete?id=${this.state.selectedLab.id}`)
            .then(r => {
                this.state.labs.splice(this.state.labs.indexOf(this.state.selectedLab), 1);
                this.forceUpdate();
                store.addNotification({
                    message: "Лаба удалена",
                    type: "success",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });
            });
    }

    render() {
        let {name, type, description, selectedLab, labs, students, dialogOpen} = this.state;
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
                                    aria-controls="labs" aria-selected="false"
                                    onClick={this.loadLabs}>
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

                            <div className="tab-pane fade d-flex" id="labs" role="tabpanel"
                                 aria-labelledby="labs-tab">
                                <table className="table table-hover mt-3">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>Наименование</th>
                                        <th>Дата выдачи</th>
                                        <th>Предполагаемая дата сдачи</th>
                                        <th>Баллы</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {labs && labs.map((lab, index) => {
                                        return (
                                            <tr className={`cursor-pointer ${lab === selectedLab ? 'table-primary' : ''}`}
                                                onClick={() => this.setState({selectedLab: lab})}
                                                onDoubleClick={() => this.props.history.push({
                                                    pathname: '/logs/log/lab',
                                                    search: `?id=${lab.id}`,
                                                    state: {
                                                        id: lab.id,
                                                        logId: this.state.id,
                                                        disciplineName: `${name} (${type})`
                                                    }
                                                })}
                                                key={index}>
                                                <td>{lab.name}</td>
                                                <td>{lab.issueDate != null ? formatDate(lab.issueDate) : ''}</td>
                                                <td>{lab.expectedCompletionDate != null ? formatDate(lab.expectedCompletionDate) : ''}</td>
                                                <td>{lab.scores}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>

                                <div className='ml-4 mt-3'>
                                    <div className="add-icon shadow mb-3" onClick={() => this.props.history.push({
                                        pathname: '/logs/log/lab',
                                        state: {
                                            logId: this.state.id,
                                            disciplineName: `${name} (${type})`
                                        }
                                    })} />
                                    <div className={`remove-icon shadow ${selectedLab == null ? 'disable' : ''}`}
                                         onClick={() => this.setState({dialogOpen: true})} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog
                    open={dialogOpen}
                    onClose={() => this.setState({dialogOpen: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Подтверждение удаления"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить лабораторную работу?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({dialogOpen: false})} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={this.deleteLab} color="primary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}