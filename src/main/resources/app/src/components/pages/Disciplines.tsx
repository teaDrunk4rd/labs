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

interface DisciplinesState {
    disciplines: Array<any>,
    openDeleteDialog: boolean,
    selectedDisciplineId?: number,
    isLoaded: boolean
}

export default class Disciplines extends Component<any, DisciplinesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            disciplines: [],
            openDeleteDialog: false,
            selectedDisciplineId: undefined,
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('disciplines').then(response => {
            if (response.status === 200) {
                this.setState({
                    disciplines: response.data,
                    isLoaded: true
                })
            }
        });
    }

    edit(id: number) {
        this.props.history.push({
            pathname: '/disciplines/discipline',
            search: `?id=${id}`,
            state: {id: id}
        });
    }

    delete(id: number|undefined) {
        axios.delete(`disciplines/discipline/delete?id=${id}`).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Дисциплина удалена",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                this.state.disciplines.splice(this.state.disciplines.indexOf(this.state.disciplines.find(function (e) {
                    return e.id === id;
                })), 1);

                this.setState({
                    openDeleteDialog: false,
                    selectedDisciplineId: undefined
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
                        Дисциплины
                    </div>
                    <button className="btn btn-outline-success"
                            onClick={() => this.props.history.push({pathname: "/disciplines/discipline"})}>
                        Добавить
                    </button>
                </div>

                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Дисциплина</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.disciplines.length !== 0 && this.state.disciplines.map((discipline, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={(e) => this.edit(discipline.id)}>
                                <td>{discipline.name}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <div className="dropdown">
                                        <div className="dots-icon" aria-expanded="false"
                                             id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"/>
                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                            <div className="dropdown-item"
                                                 onClick={() => this.edit(discipline.id)}>
                                                Редактировать
                                            </div>
                                            <div className="dropdown-item"
                                                 onClick={() => this.setState({
                                                     openDeleteDialog: true,
                                                     selectedDisciplineId: discipline.id
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
                    onClose={() => this.setState({openDeleteDialog: false, selectedDisciplineId: undefined})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить дисциплину?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false, selectedDisciplineId: undefined})}
                                color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => this.delete(this.state.selectedDisciplineId)} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}