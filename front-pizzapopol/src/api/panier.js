import axios from 'axios';
import { config } from '../config';
const token = window.localStorage.getItem('popol-token');
//console.log('popol-token',token)
export const saveCommande = (datas) => {
    return axios.post(config.api_url + "/api/v1/commande/save",
        datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            // console.log(response)
            return response
        }).catch((err) => {
            console.log("Echec AJAX", err)
        })

}

export const paymentCommande = (datas) => {
    return axios.post(config.api_url + "/api/v1/commande/payment", datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}

export const validationCommande = (datas) => {
    return axios.post(config.api_url + "/api/v1/commande/validation", datas, { headers: { 'x-access-token': token } })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            return err;
        })

}




