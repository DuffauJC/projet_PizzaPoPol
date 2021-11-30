import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadBoisson } from '../../../actions/boisson/boissonAction';
import { deleteBoisson, getAllBoisson } from '../../../api/boisson'
import { Link } from 'react-router-dom';

const Boisson = () => {
    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)
    const boisson = useSelector(store => store.boissons.boissons)
    //console.log(boisson)
    const dispatch = useDispatch()

    // mise a jour du store boisson a chaque modif (tableau à jour)
    useEffect(() => {
        getAllBoisson()
            .then((res) => {
                //console.log('res', res.data.result)
                dispatch(loadBoisson(res.data.result))
            })
    }, [dispatch])


    const onClickDelete = (id) => {
        deleteBoisson(id)
            .then((res) => {
                //console.log('response', res)
                getAllBoisson()
                    .then((res) => {
                        //console.log('res', res.data.result)
                        dispatch(loadBoisson(res.data.result))
                    })
            }).catch((err) => {
                console.log("Echec AJAX", err)
            })
    }

    return (
        <div className="produit-list">
            
            {user === "admin" ?<div>
                <div className="admin-retour"><Link to='/admin'><i className="fas fa-arrow-circle-left backProduit "> Retour Admin</i></Link>
                    <Link to='/admin/boisson/add'><i className="fas fa-plus-circle addProduit "> Ajouter une Boisson</i></Link></div>
            <h2>Tableau des Boissons</h2>
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
                        boisson ?
                            boisson.map((p, index) => {
                                return <tr key={index}>
                                    <td>{p.category.title}</td>
                                    <td>{p.title}</td>
                                    <td>{p.price.$numberDecimal} €</td>
                                    <td>
                                        <Link to={`/admin/boisson/edit/${p._id}`}><i className="fas fa-edit"></i></Link>
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
export default Boisson