import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Produit from '../components/produit'


const Carte = () => {
    const antipasti = useSelector(store => store.antipastis.antipastis)
    const pizzas = useSelector(store => store.pizzas.pizzas)
    const desserts = useSelector(store => store.desserts.desserts)
    const boissons = useSelector(store => store.boissons.boissons)

    useEffect(() => {

    }, [antipasti,pizzas,desserts,boissons])


    // filtre entre pizza rouge et blanche
    let pizzaRouges = pizzas.filter(pizzas => pizzas.category.title === "PIIZE ROSSE")
    let pizzaBlanches = pizzas.filter(pizzas => pizzas.category.title === "PIZZE BIANCHE")

    //filtre sur les boissons, rouge, blanc, rose, liqueur, soda etc...
    let vinRouges = boissons.filter(boissons => boissons.category.title === "VINI ROSSI")
    let vinBlancs = boissons.filter(boissons => boissons.category.title === "VINI BIANCHI")
    let vinRoses = boissons.filter(boissons => boissons.category.title === "VINI ROSATI")
    let liqueur = boissons.filter(boissons => boissons.category.title === "ALCOLICI E LIQUORI")
    let boissonFroides = boissons.filter(boissons => boissons.category.title === "FROID")
    let boissonChaudes = boissons.filter(boissons => boissons.category.title === "CHAUD")


    return (
        <div className="carte">

            {/* Antipasti */}
            <div className="carte-1">
                <div className="carte-antipasti-img box-shadow"></div>
                <div className="carte-title">
                    <h2>ANTIPASTI</h2>
                    <h3>Antispasti et Plats (7/8 Parts) à partager en famille ou entre amis.</h3>
                </div>
                <div className="carte-produit">
                    {antipasti.map((ant, index) => {
                        return  <Produit key={index} produit={ant} />      
                       
                    })}
                </div>
            </div>

            {/* Pizza rouge */}
            <div className="carte-1">
                <div className="carte-pizza-rouge-img box-shadow"></div>
                <div className="carte-title">
                    <h2>PIZZE ROSSE</h2>
                    <h3>Pizze sur une base de tomates San Marzano.</h3>
                </div>
                <div className="carte-produit">
                    {pizzaRouges.map((pizR, index) => {
                        return <Produit key={index} produit={pizR} />
                    })}
                </div>
            </div>

            {/* Pizza blanche */}
            <div className="carte-1">
                <div className="carte-pizza-blanche-img box-shadow"></div>
                <div className="carte-title">
                    <h2>PIZZE BIANCHE</h2>
                    <h3>Pizze sur une base de crème.</h3>
                </div>
                <div className="carte-produit">
                    {pizzaBlanches.map((pizB, index) => {
                        return <Produit key={index} produit={pizB} />
                    })}
                </div>
            </div>

            {/* Desserts */}
            <div className="carte-1">
                <div className="carte-dessert-img box-shadow"></div>
                <div className="carte-title">
                    <h2>DOLCI</h2>
                    <h3>Tous les desserts sont fait maison, à l’exception des glaces artisanales.</h3>
                </div>
                <div className="carte-produit">
                    {desserts.map((dess, index) => {
                        return <Produit key={index} produit={dess} />
                    })}
                </div>
            </div>

            {/* Vins rouges */}
            <div className="carte-1">
                <div className="carte-vin-rouge-img box-shadow"></div>
                <div className="carte-title">
                    <h2>VINI ROSSI</h2>
                    <h3>Certains de nos vins se vendent aussi au verre.</h3>
                </div>
                <div className="carte-produit">
                    {vinRouges.map((vinR, index) => {
                        return <Produit key={index} produit={vinR} />
                    })}
                </div>
            </div>

            {/* Vins blancs */}
            <div className="carte-1">
                <div className="carte-vin-blanc-img box-shadow"></div>
                <div className="carte-title">
                    <h2>VINI BIANCHI</h2>
                    <h3>Certains de nos vins se vendent aussi au verre.</h3>
                </div>
                <div className="carte-produit">
                    {vinBlancs.map((vinB, index) => {
                        return <Produit key={index} produit={vinB} />
                    })}
                </div>
            </div>

            {/* Vins roses */}
            <div className="carte-1">
                <div className="carte-vin-rose-img box-shadow"></div>
                <div className="carte-title">
                    <h2>VINI ROSATI</h2>
                    <h3>Certains de nos vins se vendent aussi au verre.</h3>
                </div>
                <div className="carte-produit">
                    {vinRoses.map((vinRs, index) => {
                        return <Produit key={index} produit={vinRs} />
                    })}
                </div>
            </div>

            {/* Liqueurs */}
            <div className="carte-1">
                <div className="carte-liqueur-img box-shadow"></div>
                <div className="carte-title">
                    <h2>ALCOLICI E LIQUORI</h2>
                    <h3>Se vend au verre.</h3>
                </div>
                <div className="carte-produit">
                    {liqueur.map((liq, index) => {
                        return <Produit key={index} produit={liq} />
                    })}
                </div>
            </div>

            {/* Froid */}
            <div className="carte-1">
                <div className="carte-froid-img box-shadow"></div>
                <div className="carte-title">
                    <h2>FROID</h2>
                    <h3>Eau, Bière, Soda.</h3>
                </div>
                <div className="carte-produit">
                    {boissonFroides.map((bof, index) => {
                        return <Produit key={index} produit={bof} />
                    })}
                </div>
            </div>

            {/* Chaud */}
            <div className="carte-1">
                <div className="carte-chaud-img box-shadow"></div>
                <div className="carte-title">
                    <h2>CHAUD</h2>
                    <h3>Café, Thé.</h3>
                </div>
                <div className="carte-produit">
                    {boissonChaudes.map((boc, index) => {
                        return <Produit key={index} produit={boc} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Carte
