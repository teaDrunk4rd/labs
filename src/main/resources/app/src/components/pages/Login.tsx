import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {checkRole, setUserData} from "../helpers";

interface LoginState {
    email: string,
    password: string
}

export default class Login extends Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();

        axios.post('login', {
            email: this.state.email,
            password: this.state.password
        }).then((response: any) => {
            if (+response.status === 200) {
                setUserData(response.data.name, response.data.roles[0]);
                Cookies.set('token', `Bearer ${response.data.accessToken}`);
                this.props.history.push(checkRole("ROLE_ADMIN") ? '/logs' : '/');
            }
        });
    }

    render() {
        const {email, password} = this.state;
        return (
            <div className="col-6 m-auto">
                <div className="card">
                    <div className="card-header">Вход</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <label className="offset-md-3 col-md-6 col-form-label">E-Mail</label>
                                <div className="offset-md-3 col-md-6">
                                    <input id="email" type="text" name="email"
                                           value={email}
                                           onChange={event => this.setState({email: event.target.value})}
                                           autoComplete="email"
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-3 col-md-6 col-form-label">Пароль</label>
                                <div className="offset-md-3 col-md-6">
                                    <input id="password" type="password" name="password"
                                           value={password}
                                           onChange={event => this.setState({password: event.target.value})}
                                           autoComplete="current-password"
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 offset-md-3 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">
                                        Вход
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
