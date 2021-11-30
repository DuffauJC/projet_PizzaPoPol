import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadPizza } from '../../../actions/pizza/pizzaAction';
import { deletePizza, getAllPizza } from '../../../api/pizza'
import { Link } from 'react-router-dom';

const Pizza = () => {
    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)
    const pizza = useSelector(store => store.pizzas.pizzas)
    //console.log(pizza)
    const dispatch = useDispatch()

    // mise a jour du store pizza a chaque modif (tableau à jour)
    useEffect(() => {
        getAllPizza()
            .then((res) => {
                //console.log('res', res.data.result)
                dispatch(loadPizza(res.data.result))
            })
    }, [dispatch])


    const onClickDelete = (id) => {
        deletePizza(id)
            .then((res) => {
                //console.log('response', res)
                getAllPizza()
                    .then((res) => {
                        //console.log('res', res.data.result)
                        dispatch(loadPizza(res.data.result))
                    })
            }).catch((err) => {
                console.log("Echec AJAX", err)
            })
    }

    return (
        <div className="produit-list">
            
            {user === "admin" ?<div>
                <div className="admin-retour"><Link to='/admin'><i className="fas fa-arrow-circle-left backProduit "> Retour Admin</i></Link>
                    <Link to='/admin/pizza/add'><i className="fas fa-plus-circle addProduit "> Ajouter une Pizza</i></Link></div>
                
            <h2>Tableau des Pizzas</h2>
            <table className="tableProduit">
                <thead>
                    <tr>
                        <td>Category</td>
                        <td>Nom</td>
                        <td>Prix</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        pizza ?
                            pizza.map((p, index) => {
                                return <tr key={index}>
                                    <td>{p.category.title}</td>
                                    <td>{p.title}</td>
                                    <td>{p.price.$numberDecimal} €</td>
                                    <td>
                                        <Link to={`/admin/pizza/edit/${p._id}`}><i className="fas fa-edit"></i></Link>
                                        <i className="fas fa-trash-alt produit-del"
                                            onClick={(e) =>
                                                onClickDelete(p._id, e)
                                            }
                                        ></i>
                                    </td>
                                </tr>
                            })
                            : null
                    }
                </tbody>

            </table>   
            </div>: <p>Vous n'êtes pas administrateur.</p>}
       
        </div>
    )

}
export default Pizza