import React, {Component} from "react";
import axios from "axios";
import Preloader from "../../Preloader";
import {checkRole} from "../../helpers";
import {store} from "react-notifications-component";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface LogsState {
    logs: Array<any>,
    openDeleteDialog: boolean,
    selectedLogId?: number,
    isLoaded: boolean
}

export default class Logs extends Component<any, LogsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            logs: [],
            openDeleteDialog: false,
            selectedLogId: undefined,
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('logs').then(response => {
            if (response.status === 200) {
                this.setState({
                    logs: response.data,
                    isLoaded: true
                })
            }
        });
    }

    edit(id: number) {
        this.props.history.push({
            pathname: '/logs/log',
            search: `?logId=${id}`,
            state: {logId: id}
        });
    }

    delete(id: number|undefined) {
        axios.delete(`logs/log/delete?id=${id}`).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Журнал удалён",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                this.state.logs.splice(this.state.logs.indexOf(this.state.logs.find(function (e) {
                    return e.id === id;
                })), 1);

                this.setState({
                    openDeleteDialog: false,
                    selectedLogId: undefined
                });
            }
        })
    }

    render() {
        return (
            <div className="col-8 m-auto">
                {!this.state.isLoaded && <Preloader/>}
                <div className="d-flex justify-content-between mb-3">
                    <div className="h3 font-weight-bold">
                        Журналы
                    </div>
                    {
                        checkRole("ROLE_ADMIN") &&
                        <button className="btn btn-outline-success"
                                onClick={() => this.props.history.push({pathname: "/logs/log"})}>
                            Добавить
                        </button>
                    }

                </div>

                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Дисциплина</th>
                        <th>Тип</th>
                        <th>Группа</th>
                        <th>Курс</th>
                        {checkRole("ROLE_ADMIN") && <th>Преподаватель</th>}
                        {checkRole("ROLE_ADMIN") && <th/>}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.logs.length !== 0 && this.state.logs.map((log, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={(e) => this.edit(log.id)}>
                                <td>{log.discipline}</td>
                                <td>{log.disciplineType}</td>
                                <td>{log.group}</td>
                                <td>{log.course}</td>
                                {checkRole("ROLE_ADMIN") && <td>{log.teacher}</td>}
                                {
                                    checkRole("ROLE_ADMIN") &&
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <div className="dropdown">
                                            <div className="dots-icon" aria-expanded="false"
                                                 id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"/>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                <div className="dropdown-item"
                                                     onClick={() => this.edit(log.id)}>
                                                    Редактировать
                                                </div>
                                                <div className="dropdown-item"
                                                     onClick={() => this.setState({
                                                         openDeleteDialog: true,
                                                         selectedLogId: log.id
                                                     })}>
                                                    Удалить
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                }
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={() => this.setState({openDeleteDialog: false, selectedLogId: undefined})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить журнал?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false, selectedLogId: undefined})}
                                color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => this.delete(this.state.selectedLogId)} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}