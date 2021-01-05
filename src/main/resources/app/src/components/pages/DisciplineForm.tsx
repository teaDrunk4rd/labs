import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";
import {getGradeBasedClassName} from "../helpers";

interface DisciplineFormState {
    name: string,
    logs: Array<any>,
    isLoaded: boolean
}

export default class DisciplineForm extends Component<any, DisciplineFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            logs: [],
            isLoaded: this.props.location.state?.id === undefined
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state?.id !== undefined)
            axios.get(`disciplines/discipline?id=${this.props.location.state.id}`).then(disciplinesResponse => {
                if (disciplinesResponse.status === 200) {
                    axios.get(`disciplines/discipline/logs?id=${this.props.location.state.id}`).then(response => {
                        if (response.status === 200) {
                            this.setState({
                                name: disciplinesResponse.data.name,
                                logs: response.data,
                                isLoaded: true
                            });
                        }
                    });
                }
            });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.props.location.state?.id !== undefined)
            axios.put('disciplines/discipline/update', {
                id: this.props.location.state.id,
                name: this.state.name
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Изменения сохранены",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/disciplines'})
                }
            });
        else
            axios.post('disciplines/discipline/create', {
                name: this.state.name
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Дисциплина создана",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/disciplines'})
                }
            });
    }

    createGroup() {
        if (this.props.location.state?.id === undefined)
            axios.post('disciplines/discipline/create', {
                name: this.state.name
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Дисциплина создана",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({
                        pathname: '/logs/log',
                        state: {disciplineId: response.data}
                    });
                }
            });
        else
            this.props.history.push({
                pathname: '/logs/log',
                state: {disciplineId: this.props.location.state.id}
            });
    }

    render() {
        let {name, logs} = this.state;
        return (
            <div className="col-7 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded && <Preloader className='form-loader'/>}
                    <div className="card-header">Дисциплина</div>
                    <div className="card-body">
                        <div className="row mb-2">
                            <label className="offset-md-2 col-md-8 col-form-label d-flex justify-content-start">
                                Наименование
                            </label>

                            <div className="offset-md-2 col-md-8 mt-1">
                                <input type="text"
                                       autoComplete="false"
                                       value={name}
                                       onChange={event => this.setState({name: event.target.value})}
                                       className="form-control "/>
                            </div>
                        </div>

                        <label className="offset-md-2 col-md-8 col-form-label d-flex justify-content-start">
                            Журналы
                        </label>
                        <div className="offset-md-2 col-md-8 d-flex">
                            <table className="table table-hover">
                                <thead className="table-dark">
                                <tr>
                                    <th>Группа</th>
                                    <th>Тип</th>
                                    <th>Курс</th>
                                    <th>Преподаватель</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {logs && logs.map((log, index) => {
                                    return (
                                        <tr className={`cursor-pointer ${getGradeBasedClassName(log.grade)}`}
                                            onClick={() => this.props.history.push({
                                                pathname: '/groups/group',
                                                search: `?id=${log.id}`,
                                                state: {id: log.id}
                                            })}
                                            key={index}>
                                            <td>{log.group.name}</td>
                                            <td>{log.disciplineType.name}</td>
                                            <td>{log.group.course}</td>
                                            <td>{log.teacher.name}</td>
                                            <td onClick={(e) => e.stopPropagation()}>
                                                <div className="dropdown">
                                                    <div className="dots-icon" aria-expanded="false"
                                                         id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"/>
                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                        <div className="dropdown-item"
                                                             onClick={() => this.props.history.push({
                                                                 pathname: '/logs/log',
                                                                 search: `?id=${log.id}`,
                                                                 state: {id: log.id}
                                                             })}>
                                                            Редактировать
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

                            <div className='ml-4'>
                                <div className="add-icon shadow mb-3" onClick={this.createGroup}/>
                            </div>
                        </div>

                        <div className="offset-md-2 col-md-8 d-flex justify-content-end">
                            <button className="btn btn-success" onClick={this.handleSubmit}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}