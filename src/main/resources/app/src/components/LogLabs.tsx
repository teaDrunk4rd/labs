import React, {Component} from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {store} from "react-notifications-component";
import {RouteComponentProps} from 'react-router-dom';
import {formatDate} from "./helpers";

interface LogLabsProps extends RouteComponentProps<any> {
    logId: number,
    disciplineName: string
}

interface LogLabsState {
    labs: Array<any>,
    selectedLab: any,
    dialogOpen: boolean,
    isLoaded: boolean
}

export default class LogLabs extends Component<LogLabsProps, LogLabsState> {
    constructor(props: LogLabsProps) {
        super(props);
        this.state = {
            labs: [],
            selectedLab: null,
            dialogOpen: false,
            isLoaded: false
        };
        this.deleteLab = this.deleteLab.bind(this);
    }

    componentDidMount() {
        axios.get(`labs?logId=${this.props.logId}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    labs: response.data,
                    isLoaded: true
                })
            }
        });
    }

    deleteLab(event: any) {
        axios.delete(`labs/delete?id=${this.state.selectedLab.id}`)
            .then(r => {
                this.state.labs.splice(this.state.labs.indexOf(this.state.selectedLab), 1);
                this.setState({dialogOpen: false});
                store.addNotification({
                    message: "Лаба удалена",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });
            });
    }

    render() {
        let {logId, disciplineName} = this.props;
        let {labs, dialogOpen} = this.state;
        return (
            <div>
                <div className="my-2 d-flex justify-content-end">
                    <button className="btn btn-success"
                            onClick={() => this.props.history.push({
                                pathname: '/logs/log/lab',
                                state: {
                                    logId: logId,
                                    disciplineName: disciplineName
                                }
                            })}>
                        Добавить
                    </button>
                </div>
                <table className="table table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>Наименование</th>
                        <th>Дата выдачи</th>
                        <th>Предполагаемая дата сдачи</th>
                        <th>Баллы</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {labs && labs.map((lab, index) => {
                        return (
                            <tr className="cursor-pointer"
                                onClick={() => this.props.history.push({
                                    pathname: '/logs/log/lab',
                                    search: `?id=${lab.id}`,
                                    state: {
                                        id: lab.id,
                                        logId: logId,
                                        disciplineName: disciplineName
                                    }
                                })}
                                key={index}>
                                <td>{lab.name}</td>
                                <td>{lab.issueDate != null ? formatDate(lab.issueDate) : ''}</td>
                                <td>{lab.expectedCompletionDate != null ? formatDate(lab.expectedCompletionDate) : ''}</td>
                                <td>{lab.scores}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <div className="dropdown">
                                        <div className="dots-icon" aria-expanded="false"
                                             id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"/>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-item"
                                                 onClick={() => this.props.history.push({
                                                     pathname: '/logs/log/lab',
                                                     search: `?id=${lab.id}`,
                                                     state: {
                                                         id: lab.id,
                                                         logId: logId,
                                                         disciplineName: disciplineName
                                                     }
                                                 })}>
                                                Редактировать
                                            </div>
                                            <div className="dropdown-item"
                                                 onClick={() => this.setState({
                                                     dialogOpen: true,
                                                     selectedLab: lab
                                                 })}>
                                                Удалить
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <Dialog
                    open={dialogOpen}
                    onClose={() => this.setState({dialogOpen: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
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
                        <Button onClick={this.deleteLab} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}