import axios from 'axios';
import { config } from '../config';
const token = window.localStorage.getItem('popol-token');

export const saveBoisson = (datas) => {
    return axios.post(config.api_url + "/api/v1/boisson/save",
        datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            // console.log(response)
            return response
        }).catch((err) => {
            console.log("Echec AJAX", err)
        })

}

export const getAllBoisson = () => {
    return axios.get(config.api_url + "/api/v1/boisson")
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}


export const updateBoisson = (id, datas) => {
    return axios.put(config.api_url + "/api/v1/boisson/update/" + id, datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}


export const deleteBoisson = (id) => {
    return axios.delete(config.api_url + "/api/v1/boisson/delete/" + id, { headers: { 'x-access-token': token } })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
}

