import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as axios from "axios";
import Preloader from "./Preloader";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoaded: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('api/disciplines').then(response => {
            this.setState({
                isLoaded: true
            })
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('api/login', {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            if (response.status === 200 && !response.data.message) {
                localStorage['user'] = JSON.stringify(response.data);
                this.props.history.push('/');
            }
        });
    }

    render() {
        const {email, password} = this.state;
        return (
            <div className="col-6 m-auto">
                {!this.state.isLoaded ? <Preloader /> : <div/>}
                <div className="card">
                    <div className="card-header">Вход</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">E-Mail</label>
                                <div className="col-md-6">
                                    <input id="email" type="email" name="email"
                                           value={email}
                                           onChange={event => this.setState({email: event.target.value})}
                                           autoComplete="email" autoFocus="autofocus"
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">Пароль</label>
                                <div className="col-md-6">
                                    <input id="password" type="password" name="password"
                                           value={password}
                                           onChange={event => this.setState({password: event.target.value})}
                                           autoComplete="current-password"
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group d-flex justify-content-end col-10 pr-2">
                                <Link to="/registration">
                                    Регистрация
                                </Link>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
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
