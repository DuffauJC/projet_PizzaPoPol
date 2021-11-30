import axios from 'axios';
import { config } from '../config';
const token = window.localStorage.getItem('popol-token');

export const saveAntipasti = (datas) => {
    return axios.post(config.api_url + "/api/v1/antipasti/save",
        datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            // console.log(response)
            return response
        }).catch((err) => {
            console.log("Echec AJAX", err)
        })

}

export const getAllAntipasti = () => {
    return axios.get(config.api_url + "/api/v1/antipasti")
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}

export const updateAntipasti = (id, datas) => {
    return axios.put(config.api_url + "/api/v1/antipasti/update/" + id, datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}


export const deleteAntipasti = (id) => {
    return axios.delete(config.api_url + "/api/v1/antipasti/delete/" + id, { headers: { 'x-access-token': token } })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
}

