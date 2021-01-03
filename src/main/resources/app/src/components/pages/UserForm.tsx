import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {store} from "react-notifications-component";

interface UserFormState {
    name: string,
    email: string,
    role: any,
    group: any,
    password: string,
    roles: Array<any>,
    groups: Array<any>,
    isLoaded: boolean
}

export default class UserForm extends Component<any, UserFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            email: '',
            role: null,
            group: null,
            password: '',
            roles: [],
            groups: [],
            isLoaded: this.props.location.state?.id === undefined
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state?.id !== undefined)
            axios.get(`users/user?id=${this.props.location.state.id}`).then(response => {
                if (response.status === 200) {
                    this.setState({
                        name: response.data.name,
                        email: response.data.email,
                        role: response.data.role,
                        group: response.data.group,
                        password: response.data.password
                    });
                }
            });

        axios.get('roles').then(response => {
            if (response.status === 200) {
                this.setState({roles: response.data});

                axios.get('groups').then(response => {
                    if (response.status === 200) {
                        this.setState({
                            groups: response.data,
                            isLoaded: true
                        });
                        if (this.props.location.state?.groupId !== undefined) // при переходе с компонента формы группы
                            this.setState({
                                role: this.state.roles.find(r => r.erole === "ROLE_STUDENT"),
                                group: this.state.groups.find(g => g.id === this.props.location.state.groupId)
                            });
                    }
                });
            }
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.props.location.state?.id !== undefined)
            axios.put('users/user/update', {
                id: this.props.location.state.id,
                name: this.state.name,
                email: this.state.email,
                roleId: this.state.role?.id,
                groupId: this.state.group?.id
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Изменения сохранены",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    // this.props.history.push({pathname: '/users'})
                }
            });
        else
            axios.post('users/user/create', {
                name: this.state.name,
                email: this.state.email,
                roleId: this.state.role?.id,
                groupId: this.state.group?.id,
                password: this.state.password
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Пользователь создан",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    // this.props.history.push({pathname: '/users'})
                }
            });
    }

    render() {
        let {name, email, role, group, password, roles, groups} = this.state;
        return (
            <div className="col-8 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded && <Preloader className='form-loader'/>}
                    <div className="card-header">Пользователь</div>
                    <div className="card-body">
                        <div className="row mb-2">
                            <label className="offset-md-2 col-md-5 col-form-label d-flex justify-content-start">
                                Полное имя
                            </label>
                            <label className="col-md-3 col-form-label d-flex justify-content-start">
                                Email
                            </label>

                            <div className="offset-md-2 col-md-5 mt-1">
                                <input type="text"
                                       autoComplete="false"
                                       value={name}
                                       onChange={event => this.setState({name: event.target.value})}
                                       className="form-control"/>
                            </div>
                            <div className="col-md-3 mt-1">
                                <input type="text"
                                       autoComplete="false"
                                       value={email}
                                       onChange={event => this.setState({email: event.target.value})}
                                       className="form-control"/>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <label className="offset-md-2 col-md-5 col-form-label d-flex justify-content-start">
                                Роль
                            </label>
                            {
                                this.props.location.state?.id === undefined &&
                                <label className="col-md-3 col-form-label d-flex justify-content-start">
                                    Пароль
                                </label>
                            }
                        </div>

                        <div className="row mb-2">
                            <div className="offset-md-2 col-md-5 mt-1">
                                <FormControl variant="outlined" className="w-100">
                                    <Select value={role?.id || 0}
                                            onChange={event =>
                                                this.setState({
                                                    role: roles.find(function (r) {
                                                        return r.id === event.target.value;
                                                    })
                                                })
                                            }
                                            className="pt-1 text-start padding-bottom-1px">
                                        {roles.length !== 0 && roles.map((role, index) => {
                                            return (<MenuItem key={index} value={role.id}>{role.name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            {
                                this.props.location.state?.id === undefined &&
                                <div className="col-md-3 mt-1">
                                    <input type="text"
                                           autoComplete="false"
                                           value={password}
                                           onChange={event => this.setState({password: event.target.value})}
                                           className="form-control"/>
                                </div>
                            }
                        </div>

                        {
                            role != null && role.erole === "ROLE_STUDENT" &&
                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-10 col-form-label d-flex justify-content-start">
                                    Группа
                                </label>

                                <div className="offset-md-2 col-md-5 mt-1">
                                    <FormControl variant="outlined" className="w-100">
                                        <Select value={group?.id || 0}
                                                onChange={event =>
                                                    this.setState({
                                                        group: groups.find(function (r) {
                                                            return r.id === event.target.value;
                                                        })
                                                    })
                                                }
                                                className="pt-1 text-start padding-bottom-1px">
                                            {groups.length !== 0 && groups.map((group, index) => {
                                                return (<MenuItem key={index} value={group.id}>{group.name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        }

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