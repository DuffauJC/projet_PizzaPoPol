import { combineReducers } from "redux";
import PizzaReducer from './pizzaReducer';
import PanierReducer from './panierReducer';
import UserReducer from './userReducer';
import AntipastiReducer from './antipastiReducer';
import BoissonReducer from './boissonReducer';
import CategoryReducer from './categoryReducer';
import DessertReducer from './dessertReducer';

const rootReducer = combineReducers({
    desserts: DessertReducer,
    categorys: CategoryReducer,
    boissons: BoissonReducer,
    antipastis: AntipastiReducer,
    panier: PanierReducer,
    pizzas: PizzaReducer,
    user: UserReducer
});

export default rootReducer;