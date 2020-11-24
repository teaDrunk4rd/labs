import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Login from "./components/Login";


export class Router extends Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <div className='row mx-5'>
                    {this.props.children}
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </div>
            </div>
        );
    }
}