import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom'

// les composants
import Header from './containers/header'
import Home from './containers/home'
import Login from './containers/user/login'
import Register from './containers/user/register'
import Logout from './containers/user/logout'
import Forgot from './containers/user/forgot'
import Profil from './containers/user/profil'
import Carte from './containers/carte'
import Panier from './containers/panier'
import Payment from './containers/payment'
import Success from './containers/success'

//admin
import Admin from './containers/admin/admin'
import Antipasti from './containers/admin/antipasti/antipasti'
import AddAntipasti from './containers/admin/antipasti/addAntipasti'
import EditAntipasti from './containers/admin/antipasti/editAntipasti'
import Boisson from './containers/admin/boisson/boisson'
import AddBoisson from './containers/admin/boisson/addBoisson'
import EditBoisson from './containers/admin/boisson/editBoisson'
import Dessert from './containers/admin/dessert/dessert'
import AddDessert from './containers/admin/dessert/addDessert'
import EditDessert from './containers/admin/dessert/editDessert'
import Pizza from './containers/admin/pizza/pizza'
import AddPizza from './containers/admin/pizza/addPizza'
import EditPizza from './containers/admin/pizza/editPizza'
import Category from './containers/admin/category/category'
import AddCategory from './containers/admin/category/addCategory'
import EditCategory from './containers/admin/category/editCategory'


// router avc un HOC RequireDataAuth
import RequireAuth from './helpers/requireAuth';

// page introuvable
import NotFound from './containers/notFound'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route exact path='/' component={RequireAuth(Home)} />
          <Route exact path='/register' component={RequireAuth(Register)} />
          <Route exact path='/login' component={RequireAuth(Login)} />
          <Route exact path='/profil' component={RequireAuth(Profil)} />
          <Route exact path='/logout' component={RequireAuth(Logout)} />
          <Route exact path='/forgot' component={RequireAuth(Forgot)} />
          <Route exact path='/carte' component={RequireAuth(Carte)} />
          <Route exact path='/panier' component={RequireAuth(Panier)} />
          <Route exact path='/payment/:commandeId' component={RequireAuth(Payment, true)} />
          <Route exact path='/success' component={RequireAuth(Success,true)} />
          <Route exact path='/admin' component={RequireAuth(Admin, true)} />
          <Route exact path='/admin/antipasti' component={RequireAuth(Antipasti, true)} />
          <Route exact path='/admin/antipasti/add' component={RequireAuth(AddAntipasti, true)} />
          <Route exact path='/admin/antipasti/edit/:id' component={RequireAuth(EditAntipasti, true)} />
          <Route exact path='/admin/boisson' component={RequireAuth(Boisson, true)} />
          <Route exact path='/admin/boisson/add' component={RequireAuth(AddBoisson, true)} />
          <Route exact path='/admin/boisson/edit/:id' component={RequireAuth(EditBoisson, true)} />
          <Route exact path='/admin/dessert' component={RequireAuth(Dessert, true)} />
          <Route exact path='/admin/dessert/add' component={RequireAuth(AddDessert, true)} />
          <Route exact path='/admin/dessert/edit/:id' component={RequireAuth(EditDessert, true)} />
          <Route exact path='/admin/pizza' component={RequireAuth(Pizza, true)} />
          <Route exact path='/admin/pizza/add' component={RequireAuth(AddPizza, true)} />
          <Route exact path='/admin/pizza/edit/:id' component={RequireAuth(EditPizza, true)} />
          <Route exact path='/admin/category' component={RequireAuth(Category, true)} />
          <Route exact path='/admin/category/add' component={RequireAuth(AddCategory, true)} />
          <Route exact path='/admin/category/edit/:id' component={RequireAuth(EditCategory, true)} />
          <Route component={RequireAuth(NotFound)}/>
          </Switch>
      </main>
    </div>
  );
}

export default App;
