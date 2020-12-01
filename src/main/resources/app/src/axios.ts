import {store} from 'react-notifications-component';
import {AxiosError, AxiosResponse} from "axios";

declare global {
    interface Window {
        axios: any;
    }
    interface BaseResponse extends AxiosResponse {
        data: Array<any>,
        status: number
    }
}

window.axios = require('axios');

let errorMessages = {
    auth: "Требуется авторизация",
    forbidden: "Доступ запрещён",
    default: "Произошла ошибка"
}

window.axios.interceptors.response.use((response: BaseResponse) => {
    return response;
}, (error: AxiosError) => {
    store.addNotification({
        title: 'Ошибка',
        message: errorMessages.default,
        type: "danger",
        insert: "top",
        container: "top-right"
    });
    // let message = /^[А-Яа-я0-9 _]*[А-Яа-я0-9][А-Яа-я0-9 _]*$/.test(error.response.data.message)
    //     ? error.response.data.message
    //     : undefined;
    // if (error.response.status === 403) {
    //     store.addNotification({
    //         title: 'Ошибка',
    //         message: message || errorMessages.forbidden,
    //         type: "danger",
    //         insert: "top",
    //         container: "top-right"
    //     });
    // } else if (error.response.status === 401) {
    //     localStorage.clear();
    //     history.pushState({}, '', '/login'); // TODO: check it
    //     store.addNotification({
    //         title: 'Ошибка',
    //         message: message || errorMessages.auth,
    //         type: "danger",
    //         insert: "top",
    //         container: "top-right"
    //     });
    // } else {
    //     store.addNotification({
    //         title: 'Ошибка',
    //         message: message || errorMessages.default,
    //         type: "danger",
    //         insert: "top",
    //         container: "top-right"
    //     });
    // }

    return Promise.reject(error);
})
