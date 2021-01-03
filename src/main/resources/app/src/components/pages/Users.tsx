import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface UsersState {
    users: Array<any>,
    openDeleteDialog: boolean,
    selectedUserId?: number,
    isLoaded: boolean
}

export default class Users extends Component<any, UsersState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            openDeleteDialog: false,
            selectedUserId: undefined,
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('users').then(response => {
            if (response.status === 200) {
                this.setState({
                    users: response.data,
                    isLoaded: true
                })
            }
        });
    }

    edit(id: number) {
        this.props.history.push({
            pathname: '/users/user',
            search: `?id=${id}`,
            state: {id: id}
        });
    }

    delete(id: number|undefined) {
        axios.delete(`users/user/delete?id=${id}`).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Пользователь удалён",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                this.state.users.splice(this.state.users.indexOf(this.state.users.find(function (e) {
                    return e.id === id;
                })), 1);

                this.setState({
                    openDeleteDialog: false,
                    selectedUserId: undefined
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
                        Пользователи
                    </div>
                    <button className="btn btn-outline-success"
                            onClick={() => this.props.history.push({pathname: "/users/user"})}>
                        Добавить
                    </button>
                </div>

                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Группа</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.length !== 0 && this.state.users.map((user, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={(e) => this.edit(user.id)}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role.name}</td>
                                <td>{user.group?.name || '-'}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <div className="dropdown">
                                        <div className="dots-icon" aria-expanded="false"
                                             id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"/>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-item"
                                                 onClick={() => this.edit(user.id)}>
                                                Редактировать
                                            </div>
                                            <div className="dropdown-item"
                                                 onClick={() => this.setState({
                                                     openDeleteDialog: true,
                                                     selectedUserId: user.id
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
                    open={this.state.openDeleteDialog}
                    onClose={() => this.setState({openDeleteDialog: false, selectedUserId: undefined})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить пользователя?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false, selectedUserId: undefined})}
                                color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => this.delete(this.state.selectedUserId)} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}