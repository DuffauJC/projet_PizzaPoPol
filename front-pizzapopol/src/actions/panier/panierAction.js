import { MODIFY_PANIER, CLEAN_PANIER } from './action-type';

export const addToPanier = (panier, produit, quantityInCart) => {
    return function (dispatch) {
        //console.log('panier', panier)
        //vérification si l'id de l'argument panier est le même que produit
        let same = panier.findIndex((p) => p.id === produit._id)
        //si il n'est pas le mm
        if (same === -1) {
            //on va ajouter la quantité 1 à l'objet produit
            produit.quantityInCart = parseInt(quantityInCart);
            //ajout du produit à notre panier
            panier.push(produit);
            //sinon
        } else {
            //mise à jour de la quantité du produit concerné (panier)
            panier[same].quantityInCart += parseInt(quantityInCart)
        }

        // on ajoute avant redux le localstorage
        let lspanier = JSON.stringify(panier);
        window.localStorage.setItem('popol-panier', lspanier);


        dispatch({
            type: MODIFY_PANIER,
            payload: panier
        })
    }
}

export const deleteToPanier = (panier, produit) => {
    return function (dispatch) {
        //console.log('panier', panier)

        // si il reste un produit on vide le panier du localstorage
        if (panier.length === 1) {
            //on vide le token panier du localStorage
            localStorage.removeItem('popol-panier')
            dispatch({
                type: CLEAN_PANIER
            })
        }
        //vérification si l'id de l'argument panier est le même que produit
        let newPanier = panier.filter((p) => p._id !== produit._id);

        // on met à jour le panier dans le localstorage
        let lspanier = JSON.stringify(newPanier);
        window.localStorage.setItem('popol-panier', lspanier);
        dispatch({
            type: MODIFY_PANIER,
            payload: newPanier
        })
    }
}

export const cleanPanier = () => {
    return function (dispatch) {
        //console.log('action clean')
        dispatch({
            type: CLEAN_PANIER
        })
    }
}