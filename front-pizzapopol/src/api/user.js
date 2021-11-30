import axios from 'axios';
import { config } from '../config';
const token = window.localStorage.getItem('popol-token');

export const saveUser = (datas) => {
    return axios.post(config.api_url + "/api/v1/user/save",
        datas)
        .then((response) => {
            // console.log(response)
            return response
        }).catch((err) => {
            console.log("Echec AJAX", err)
        })

}

export const loginUser = (datas) => {
    return axios.post(config.api_url + "/api/v1/user/login", datas)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}

export const updateUser = (id,datas) => {
    return axios.put(config.api_url + "/api/v1/user/update/" + id, datas, { headers: { 'x-access-token': token } } )
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}


export const forgotPassword = (datas) => {
    return axios.post(config.api_url + "/api/v1/user/forgot", datas)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}

export const changePassword = (id,datas) => {
    return axios.post(config.api_url + "/api/v1/user/changePassword/"+id, datas)
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}

