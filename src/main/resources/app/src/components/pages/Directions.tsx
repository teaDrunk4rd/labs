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

interface DirectionsState {
    directions: Array<any>,
    openDeleteDialog: boolean,
    selectedDirectionId?: number,
    isLoaded: boolean
}

export default class Directions extends Component<any, DirectionsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            directions: [],
            openDeleteDialog: false,
            selectedDirectionId: undefined,
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('directions').then(response => {
            if (response.status === 200) {
                this.setState({
                    directions: response.data,
                    isLoaded: true
                })
            }
        });
    }

    edit(id: number) {
        this.props.history.push({
            pathname: '/directions/direction',
            search: `?id=${id}`,
            state: {id: id}
        });
    }

    delete(id: number|undefined) {
        axios.delete(`directions/direction/delete?id=${id}`).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Направление удалено",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                this.state.directions.splice(this.state.directions.indexOf(this.state.directions.find(function (e) {
                    return e.id === id;
                })), 1);

                this.setState({
                    openDeleteDialog: false,
                    selectedDirectionId: undefined
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
                        Направления
                    </div>
                    <button className="btn btn-outline-success"
                            onClick={() => this.props.history.push({pathname: "/directions/direction"})}>
                        Добавить
                    </button>
                </div>

                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Направление</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.directions.length !== 0 && this.state.directions.map((group, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={(e) => this.edit(group.id)}>
                                <td>{group.name}</td>
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
                                                     selectedDirectionId: group.id
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
                    onClose={() => this.setState({openDeleteDialog: false, selectedDirectionId: undefined})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить направление?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false, selectedDirectionId: undefined})}
                                color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => this.delete(this.state.selectedDirectionId)} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}