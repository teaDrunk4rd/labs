import {Component} from 'react';
import * as React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Router} from "./Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import "bootstrap";

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ReactNotification/>
                <Route component={Router}/>
            </BrowserRouter>
        );
    }
}

// TODO: переместить в другое место
export const formatDate = (date: string): string => {
    return new Date(date).toLocaleString('ru').substr(0,10);
};

export const getGradeBasedClassName = (grade: string): string => {
    if (['Отлично', 'Хорошо', 'Зачёт'].includes(grade))
        return 'table-success';
    return grade === 'Удовлетворительно' ? 'table-warning' : '';
};