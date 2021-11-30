import axios from 'axios';
import { config } from '../config';
const token = window.localStorage.getItem('popol-token');

export const saveCategory = (datas) => {
    return axios.post(config.api_url + "/api/v1/category/save",
        datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            // console.log(response)
            return response
        }).catch((err) => {
            console.log("Echec AJAX", err)
        })

}

export const getAllCategory = () => {
    return axios.get(config.api_url + "/api/v1/category")
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}


export const updateCategory = (id, datas) => {
    return axios.put(config.api_url + "/api/v1/category/update/" + id, datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}


