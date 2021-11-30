import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/images/popol.png'
import { useSelector } from 'react-redux'

const Header = () => {

    const user = useSelector(store => store.user)
    //console.log('user home', user)
     const panier = useSelector(store => store.panier.panier.length)
    // console.log('panier',panier)


    return (
        <div className="header-nav">
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <nav>
                <ul className="list">
                    <li> <Link to="/carte">La carte</Link></li>
                    
                    <li> {user.isLogged === false && <Link to="/register">Inscription</Link>}</li>
                    <li> {user.isLogged && user.infos.role === "admin" ? <Link to="/admin">Admin</Link>
                        : null}</li>
                    <li> {user.isLogged ? <Link to="/logout">Logout</Link>
                        : <Link to="/login">Login</Link>}</li>
                    <li> {user.isLogged && <Link to={"/profil"} ><i className="fas fa-user"></i></Link>}</li>
                    <li> {panier > 0 ? <Link to={"/panier"} >
                        <i className="fas fa-shopping-basket"></i> {panier}</Link>
                        : <Link to={"/panier"}><i className="fas fa-shopping-cart"></i></Link>}</li>

                </ul>
            </nav>
        </div>
    )
}

export default Header
