import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'



const Admin = () => {
    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)

    return (
        <div className="admin">
            <h1>Administration</h1>

            {user === "admin" ?
                <div className="admin-flex">
                    <Link to='/admin/antipasti'>
                        <div className="admin-1 box-shadow">
                            <h2>Antipasti</h2>
                            <i className="fas fa-leaf"></i>
                        </div>
                    </Link>
                    <Link to='/admin/boisson'>
                        <div className="admin-4 box-shadow">
                            <h2>Boissons</h2>
                            <i className="fas fa-cocktail"></i>
                        </div>
                    </Link>
                    
                    <Link to='/admin/dessert'>
                        <div className="admin-3 box-shadow">
                            <h2>Desserts</h2>
                            <i className="fas fa-cookie-bite"></i>
                        </div>
                    </Link>
                    
                    <Link to='/admin/pizza'>
                        <div className="admin-2 box-shadow">
                            <h2>Pizzas</h2>
                            <i className="fas fa-pizza-slice"></i>
                        </div>
                    </Link>

                    <Link to='/admin/category'>
                        <div className="admin-5 box-shadow">
                            <h2>Category</h2>
                            <i className="fas fa-list-ol"></i>
                        </div>
                    </Link>
                </div>
                : <p>Vous n'êtes pas administrateur</p>}


        </div>
    )
}

export default Admin
