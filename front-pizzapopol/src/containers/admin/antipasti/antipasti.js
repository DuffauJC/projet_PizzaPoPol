import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadAntipasti } from './../../../actions/antipasti/antipastiAction';
import { deleteAntipasti, getAllAntipasti } from './../../../api/antipasti'
import { Link } from 'react-router-dom';

const Antipasti = () => {
    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)
    const antipasti = useSelector(store => store.antipastis.antipastis)
    //console.log(antipasti)
    const dispatch = useDispatch()

    // mise a jour du store antipasti a chaque modif (tableau à jour)
    useEffect(() => {
        getAllAntipasti()
            .then((res) => {
                //console.log('res', res.data.result)
                dispatch(loadAntipasti(res.data.result))
            })
    }, [dispatch])


    const onClickDelete = (id) => {
        deleteAntipasti(id)
            .then((res) => {
                //console.log('response', res)
                getAllAntipasti()
                    .then((res) => {
                        //console.log('res', res.data.result)
                        dispatch(loadAntipasti(res.data.result))
                    })
            }).catch((err) => {
                console.log("Echec AJAX", err)
            })
    }

    return (
        <div className="produit-list">
            
            {user === "admin" ? <div>
                <div className="admin-retour"><Link to='/admin'><i className="fas fa-arrow-circle-left backProduit "> Retour Admin</i></Link>
                    <Link to='/admin/antipasti/add'><i className="fas fa-plus-circle addProduit "> Ajouter un Antipasti</i></Link></div>
           
            <h2>Tableau des Antipastis</h2>
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
                        antipasti ?
                            antipasti.map((p, index) => {
                                return <tr key={index}>
                                    <td>{p.category.title}</td>
                                    <td>{p.title}</td>
                                    <td>{p.price.$numberDecimal} €</td>
                                    <td>
                                        <Link to={`/admin/antipasti/edit/${p._id}`}><i className="fas fa-edit"></i></Link>
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
export default Antipasti