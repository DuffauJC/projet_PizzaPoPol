import { MODIFY_PANIER, CLEAN_PANIER } from '../actions/panier/action-type'


let lsPanier = JSON.parse(window.localStorage.getItem('popol-panier'));
//console.log('lspanier',lsPanier)
if (lsPanier === null) {
    lsPanier = []
}

let prixTotal = calculateTotalAmount(lsPanier)

const initialState = {
    panier: lsPanier,
    prixTotal: prixTotal
}

function calculateTotalAmount(panier) {
     //console.log("fonction", panier)
    let prixTotal = 0;
    for (let i = 0; i < panier.length; i++) {
        let total = parseFloat(panier[i].price.$numberDecimal) * parseInt(panier[i].quantityInCart);
        prixTotal += total;
    }
     //console.log('totalprice',prixTotal)
    return prixTotal
}


//fonction panierReducer
export default function PanierReducer(state = initialState, action) {
    switch (action.type) {
        case MODIFY_PANIER:
            let prixTotal = calculateTotalAmount(action.payload);
            //console.log("total", prixTotal)
            return { panier: action.payload, prixTotal:parseFloat(prixTotal)}

        case CLEAN_PANIER:
            //console.log('reducer clean', action)
            //je réinitialise un panier vide dans le store
            return { panier: [], prixTotal: 0 };

        default:
            return state;
    }
}