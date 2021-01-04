import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {store} from "react-notifications-component";
import GroupStudents from "../GroupStudents";
import {getGradeBasedClassName} from "../helpers";

interface DirectionFormState {
    name: string,
    groups: Array<any>,
    isLoaded: boolean
}

export default class DirectionForm extends Component<any, DirectionFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            groups: [],
            isLoaded: this.props.location.state?.id === undefined
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state?.id !== undefined)
            axios.get(`directions/direction?id=${this.props.location.state.id}`).then(directionsResponse => {
                if (directionsResponse.status === 200) {
                    axios.get(`directions/direction/groups?id=${this.props.location.state.id}`).then(response => {
                        if (response.status === 200) {
                            this.setState({
                                name: directionsResponse.data.name,
                                groups: response.data,
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
            axios.put('directions/direction/update', {
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
                    this.props.history.push({pathname: '/directions'})
                }
            });
        else
            axios.post('directions/direction/create', {
                name: this.state.name
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Направление создано",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/directions'})
                }
            });
    }

    createGroup() {
        if (this.props.location.state?.id === undefined)
            axios.post('directions/direction/create', {
                name: this.state.name
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Направление создано",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({
                        pathname: '/groups/group',
                        state: {directionId: response.data}
                    });
                }
            });
        else
            this.props.history.push({
                pathname: '/groups/group',
                state: {directionId: this.props.location.state.id}
            });
    }

    render() {
        let {name, groups} = this.state;
        return (
            <div className="col-7 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded && <Preloader className='form-loader'/>}
                    <div className="card-header">Направление</div>
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
                            Группы
                        </label>
                        <div className="offset-md-2 col-md-8 d-flex">
                            <table className="table table-hover">
                                <thead className="table-dark">
                                <tr>
                                    <th>Группа</th>
                                    <th>Курс</th>
                                    <th>Направление</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {groups && groups.map((group, index) => {
                                    return (
                                        <tr className={`cursor-pointer ${getGradeBasedClassName(group.grade)}`}
                                            onClick={() => this.props.history.push({
                                                pathname: '/groups/group',
                                                search: `?id=${group.id}`,
                                                state: {id: group.id}
                                            })}
                                            key={index}>
                                            <td>{group.name}</td>
                                            <td>{group.course}</td>
                                            <td>{group.direction.name}</td>
                                            <td onClick={(e) => e.stopPropagation()}>
                                                <div className="dropdown">
                                                    <div className="dots-icon" aria-expanded="false"
                                                         id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"/>
                                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                        <div className="dropdown-item"
                                                             onClick={() => this.props.history.push({
                                                                 pathname: '/groups/group',
                                                                 search: `?id=${group.id}`,
                                                                 state: {id: group.id}
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