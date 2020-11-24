import {NotificationManager} from "react-notifications";

window.axios = require('axios');

let errorMessages = {
    auth: "Требуется авторизация",
    forbidden: "Доступ запрещён",
    default: "Произошла ошибка"
}

window.axios.interceptors.response.use(response => {
    return response;
}, error => {
    let message = /^[А-Яа-я0-9 _]*[А-Яа-я0-9][А-Яа-я0-9 _]*$/.test(error.response.data.message)
        ? error.response.data.message
        : undefined;
    if (error.response.data.errors) {  // validation rule error
        NotificationManager.error(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]);
    } else if (error.response.status === 403) {
        NotificationManager.error(message || errorMessages.forbidden);
    } else if (error.response.status === 401 &&
        !NotificationManager.listNotify.find(x => x.message === errorMessages.auth)) {
        localStorage.clear();
        history.push('/login');
        NotificationManager.error(message || errorMessages.auth);
    } else if (!NotificationManager.listNotify.find(x => x.message === errorMessages.default)) {
        NotificationManager.error(message || errorMessages.default);
    }

    return Promise.reject(error);
})
