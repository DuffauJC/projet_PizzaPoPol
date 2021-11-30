import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadCategory } from '../../../actions/category/categoryAction';
import { getAllCategory } from '../../../api/category'
import { Link } from 'react-router-dom';

const Category = () => {
    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)
    const category = useSelector(store => store.categorys.categorys)
    //console.log('category',category)
    const dispatch = useDispatch()

    // mise a jour du store category a chaque modif (tableau à jour)
    useEffect(() => {
        getAllCategory()
            .then((res) => {
                //console.log('res', res.data.result)
                dispatch(loadCategory(res.data.result))
            })
    }, [dispatch])


    return (
        <div className="produit-list">
            
            {user === "admin" ?<div>
                <div className="admin-retour"><Link to='/admin'><i className="fas fa-arrow-circle-left backProduit "> Retour Admin</i></Link>
                    <Link to='/admin/category/add'><i className="fas fa-plus-circle addProduit "> Ajouter une Category</i></Link></div>
                
            <h2>Tableau des Categories</h2>
            <table className="tableProduit">
                <thead>
                    <tr>
                        <td>Nom</td>
                        <td>Description</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        category ?
                            category.map((p, index) => {
                                return <tr key={index}>
                                    <td>{p.title}</td>
                                    <td>{p.description}</td>
                                    <td>
                                        <Link to={`/admin/category/edit/${p._id}`}><i className="fas fa-edit"></i></Link>
                                      
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
export default Category