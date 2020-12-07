import React, {Component} from 'react';
import {store} from 'react-notifications-component';
import Preloader from "../Preloader";
import axios from 'axios';
import Cookies from "js-cookie";


interface ProfileState {
    email: string,
    name: string,
    group: string,
    changePasswordFlag: boolean,
    oldPassword: string,
    newPassword: string,
    passwordConfirmation: string,
    isLoaded: boolean
}

export default class Profile extends Component<any, ProfileState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            name: '',
            group: '',
            changePasswordFlag: false,
            oldPassword: '',
            newPassword: '',
            passwordConfirmation: '',
            isLoaded: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios.get('profiles').then(response => {
            if (response.status === 200) {
                this.setState({
                    email: response.data.email,
                    name: response.data.name,
                    group: response.data.group,
                    isLoaded: true
                })
            }
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        axios.put('profiles/update', {
            email: this.state.email,
            name: this.state.name,
            changePasswordFlag: this.state.changePasswordFlag,
            oldPassword: this.state.oldPassword,
            password: this.state.newPassword,
            passwordConfirmation: this.state.passwordConfirmation
        }).then(response => {
            if (response.status === 200) {
                localStorage['user'] = JSON.stringify({
                    role: JSON.parse(localStorage['user']).role,
                    name: response.data.name
                });

                store.addNotification({
                    message: "Профиль успешно изменен",
                    type: "success",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                Cookies.set('token', `Bearer ${response.data.accessToken}`)

                if (this.state.passwordConfirmation)
                    this.setState({
                        changePasswordFlag: false,
                        oldPassword: '',
                        newPassword: '',
                        passwordConfirmation: ''
                    })
            }
        });
    }

    logout(event: any) {
        event.preventDefault();
        localStorage.clear();
        Cookies.remove('token')
        this.props.history.push('/login');
    }

    render() {
        const {email, name, group, changePasswordFlag, oldPassword, newPassword, passwordConfirmation} = this.state;
        return (
            <div className="col-8 m-auto">
                <div className="card">
                    {!this.state.isLoaded ? <Preloader/> : <div/>}
                    <div className="card-header">Профиль</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} autoComplete='false'>
                            <div className="form-group d-flex justify-content-end col-10 pr-2">
                                <a href='#' onClick={this.logout}>
                                    Выйти
                                </a>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">E-Mail</label>
                                <div className="col-md-6">
                                    <input type="email"
                                           autoComplete="false"
                                           value={email}
                                           onChange={event => this.setState({email: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">
                                    Полное имя
                                </label>
                                <div className="col-md-6">
                                    <input type="text"
                                           autoComplete="false"
                                           value={name}
                                           onChange={event => this.setState({name: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            {
                                !group ? <div/> : (
                                    <div className="form-group row">
                                        <label className="col-md-4 col-form-label text-md-right">
                                            Группа
                                        </label>
                                        <div className="col-md-6">
                                            <input type="text"
                                                   autoComplete="false"
                                                   value={group}
                                                   className="form-control"
                                                   readOnly={true}/>
                                        </div>
                                    </div>)
                            }

                            {
                                changePasswordFlag ? (
                                    <div>
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Старый
                                                пароль</label>
                                            <div className="col-md-6">
                                                <input type="password"
                                                       autoComplete="new-password"
                                                       value={oldPassword}
                                                       onChange={event => this.setState({oldPassword: event.target.value})}
                                                       className="form-control "/>
                                            </div>
                                        </div>

                                        < div className="form-group row">
                                            < label className="col-md-4 col-form-label text-md-right">Новый
                                                пароль</label>
                                            <div className="col-md-6">
                                                <input type="password"
                                                       autoComplete="new-password"
                                                       value={newPassword}
                                                       onChange={event => this.setState({newPassword: event.target.value})}
                                                       className="form-control "/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Подтверждение
                                                пароля</label>
                                            <div className="col-md-6">
                                                <input type="password"
                                                       autoComplete="new-password"
                                                       value={passwordConfirmation}
                                                       onChange={event => this.setState({passwordConfirmation: event.target.value})}
                                                       className="form-control "/>
                                            </div>
                                        </div>
                                    </div>
                                ) : (

                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <a href='#'
                                               onClick={event => this.setState({changePasswordFlag: !changePasswordFlag})}>
                                                Сменить пароль
                                            </a>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Изменить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}