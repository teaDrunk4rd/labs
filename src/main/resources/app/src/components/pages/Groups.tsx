import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {checkRole} from "../helpers";
import {store} from "react-notifications-component";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface GroupsState {
    groups: Array<any>,
    openDeleteDialog: boolean,
    selectedGroupId?: number,
    isLoaded: boolean
}

export default class Groups extends Component<any, GroupsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            groups: [],
            openDeleteDialog: false,
            selectedGroupId: undefined,
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('groups').then(response => {
            if (response.status === 200) {
                this.setState({
                    groups: response.data,
                    isLoaded: true
                })
            }
        });
    }

    edit(id: number) {
        this.props.history.push({
            pathname: '/groups/group',
            search: `?id=${id}`,
            state: {id: id}
        });
    }

    delete(id: number|undefined) {
        axios.delete(`groups/group/delete?id=${id}`).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Группа удалена",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                this.state.groups.splice(this.state.groups.indexOf(this.state.groups.find(function (e) {
                    return e.id === id;
                })), 1);

                this.setState({
                    openDeleteDialog: false,
                    selectedGroupId: undefined
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
                        Группы
                    </div>
                    <button className="btn btn-outline-success"
                            onClick={() => this.props.history.push({pathname: "/logs/log"})}>
                        Добавить
                    </button>
                </div>

                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Группа</th>
                        <th>Курс</th>
                        <th>Направление</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.groups.length !== 0 && this.state.groups.map((group, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={(e) => this.edit(group.id)}>
                                <td>{group.name}</td>
                                <td>{group.course}</td>
                                <td>{group.direction.name}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <div className="dropdown">
                                        <div className="dots-icon" aria-expanded="false"
                                             id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"/>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-item"
                                                 onClick={() => this.edit(group.id)}>
                                                Редактировать
                                            </div>
                                            <div className="dropdown-item"
                                                 onClick={() => this.setState({
                                                     openDeleteDialog: true,
                                                     selectedGroupId: group.id
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
                    onClose={() => this.setState({openDeleteDialog: false, selectedGroupId: undefined})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить группу?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false, selectedGroupId: undefined})}
                                color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => this.delete(this.state.selectedGroupId)} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}