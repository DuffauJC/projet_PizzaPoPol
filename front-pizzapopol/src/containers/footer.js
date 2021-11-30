import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {


    return (
        <div className="footer">
            <div className="footer-div">
                <div>
                    <h2>PoPol - Pizzeria Napolitaine </h2>
                </div>
                <div>
                  <Link to="/">CGV</Link>  &  <Link to="/">Mentions Légales</Link>
                </div>
            </div>
            <p>© 2021 Crée par Duffau Jean-charles pour la Pizzéria Pizza PoPol</p>
        </div>
    )
}

export default Footer
