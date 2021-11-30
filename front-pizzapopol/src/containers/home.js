import React from 'react'
import { Link } from 'react-router-dom';
import Footer from './footer'

const Home = () => {


    return (
        <div className="home">
            <div className="home-img1 box-shadow">
                <div className="home-1">
                    <h1>Bienvenue chez Pizza PoPol</h1>
                    <h2>Pizzeria Napolitaine</h2>
                </div>
            </div>
            <div className="home-2">
                <div className="home-flex">
                    <div className="home-text">
                        <h2 >A propos</h2>
                        <p>PoPol est une pizzeria traditionnelle Napolitaine et les produits travaillés sont tous frais et sélectionnés avec le plus grand soin en respectant les saisons. Friuli Venezia Giulia, Puglia, Farine Italienne, la Mozzarella fior di latte (f.d.l), les Tomates San Marzano ...</p>
                    </div>
                    <div className="home-img2 box-shadow">
                        {/* background-img */}
                    </div>
                </div>
            </div>

            <div className="home-3">
                <div className="home-flex">
                    <div className="home-img3 box-shadow">
                        {/* background-img */}
                    </div>
                    <div className="home-text-1">
                        <h2>Infos pratiques</h2>

                        <h3>Heures d’accueil</h3>
                        <p>Du Mardi au Samedi</p>
                        <p>Déjeuner : de 12H à 14H</p>
                        <p>Vendredi soir et Samedi soir de 18H à 9H</p>
                        <p>Fermeture hebdomadaire : Dimanche et Lundi</p>

                        <h3>Le Restaurant</h3>
                        <p>Salle et Terrasse</p>
                        <p>Privatisation du restaurant, nous contacter.</p>

                        <h3>Pour commander</h3>
                        <p>En ligne : <Link to="/carte">La carte</Link> </p>
                        <p>Tel : (+33) 09 01 02 03 04 </p>

                        <h3>Coordonnées</h3>
                        <p>Grande Rue 31620 Castelnau d'Estretefonds</p>
                        <p>Tel : (+33) 09 01 02 03 04 </p>
                        <p>Email :pizzapopol@gmail.com</p>
                    </div>
                </div>

            </div>

            <div className="frame">
                <iframe className="box-shadow" title="castelnau d'estretefonds" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46078.39531146964!2d1.3165630866806917!3d43.79569410816702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ac02bc76f09529%3A0x406f69c2f412b40!2s31620%20Castelnau-d&#39;Estr%C3%A9tefonds!5e0!3m2!1sfr!2sfr!4v1617366794875!5m2!1sfr!2sfr" />
            </div>
            <Footer />
        </div>

    )
}

export default Home
