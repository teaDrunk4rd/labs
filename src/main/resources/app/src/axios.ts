import {store} from 'react-notifications-component';
import Cookies from 'js-cookie';

declare global {
    interface Window {
        axios: any;
    }
}

window.axios = require('axios');

let errorMessages = {
    auth: "Требуется авторизация",
    forbidden: "Доступ запрещён",
    default: "Произошла ошибка"
}

window.axios.interceptors.request.use((config: any) => {
    config.url = `http://localhost:8080/api/${config.url}`;
    config.headers.Authorization = Cookies.get('token') || null;
    return config;
});

window.axios.interceptors.response.use((response: any) => {
    return response;
}, (error: any) => {
    let errorMessage = "";

    if (error.response && error.response.status === 403) {
        errorMessage = errorMessages.forbidden;
    } else if (error.response && error.response.status === 401) {
        localStorage.clear();
        // history.pushState({}, '', '/login'); // TODO: check it
        errorMessage = errorMessages.auth;
    } else {
        errorMessage = errorMessages.default;
    }

    store.addNotification({
        title: 'Ошибка',
        message: errorMessage,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });

    return Promise.reject(error);
})
