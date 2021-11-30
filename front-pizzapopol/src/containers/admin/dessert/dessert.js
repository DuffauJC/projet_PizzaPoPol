import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadDessert } from '../../../actions/dessert/dessertAction';
import { deleteDessert, getAllDessert } from '../../../api/dessert'
import { Link } from 'react-router-dom';

const Dessert = () => {
    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)
    const dessert = useSelector(store => store.desserts.desserts)
    //console.log(dessert)
    const dispatch = useDispatch()

    // mise a jour du store Dessert a chaque modif (tableau à jour)
    useEffect(() => {
        getAllDessert()
            .then((res) => {
                //console.log('res', res.data.result)
                dispatch(loadDessert(res.data.result))
            })
    }, [dispatch])


    const onClickDelete = (id) => {
        deleteDessert(id)
            .then((res) => {
                //console.log('response', res)
                getAllDessert()
                    .then((res) => {
                        //console.log('res', res.data.result)
                        dispatch(loadDessert(res.data.result))
                    })
            }).catch((err) => {
                console.log("Echec AJAX", err)
            })
    }

    return (
        <div className="produit-list">
            
            {user === "admin" ?<div>
                <div className="admin-retour"><Link to='/admin'><i className="fas fa-arrow-circle-left backProduit "> Retour Admin</i></Link>
                    <Link to='/admin/dessert/add'><i className="fas fa-plus-circle addProduit "> Ajouter un Dessert</i></Link></div>
            <h2>Tableau des Desserts</h2>
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
                        dessert ?
                            dessert.map((p, index) => {
                                return <tr key={index}>
                                    <td>{p.category.title}</td>
                                    <td>{p.title}</td>
                                    <td>{p.price.$numberDecimal} €</td>
                                    <td>
                                        <Link to={`/admin/dessert/edit/${p._id}`}><i className="fas fa-edit"></i></Link>
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
export default Dessert