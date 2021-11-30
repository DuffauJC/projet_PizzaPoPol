import axios from 'axios';
import { config } from '../config';
const token = window.localStorage.getItem('popol-token');
//console.log('popol-token',token)
export const saveDessert = (datas) => {
    return axios.post(config.api_url + "/api/v1/dessert/save",
        datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            // console.log(response)
            return response
        }).catch((err) => {
            console.log("Echec AJAX", err)
        })

}

export const getAllDessert = () => {
    return axios.get(config.api_url + "/api/v1/dessert")
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}


export const updateDessert = (id, datas) => {
    return axios.put(config.api_url + "/api/v1/dessert/update/" + id, datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}


export const deleteDessert = (id) => {
    return axios.delete(config.api_url + "/api/v1/dessert/delete/" + id, { headers: { 'x-access-token': token } })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
}

