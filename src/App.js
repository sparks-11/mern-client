import React from 'react'
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Navigation from './components/Navigation';
import Cart from './pages/Cart';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import SingleProduct from './pages/SingleProduct';
import Order from './pages/Order';
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import Settings from './pages/Settings';

const App = () => {
  const user =useSelector(state=>state.user.currentUser)

  return (
    <BrowserRouter>
          <Navigation />

      <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/products" exact component={ProductsPage}></Route>
          <Route path="/products/:_id" component={SingleProduct}></Route>
          <Route path="/cart" component={Cart}></Route>
          <Route path="/orders"  component={Order}></Route>
          {/* <Route path="/settings"  component={Settings}></Route> */}
          <Route path="/login" >{ user ? <Redirect to="/"/>: <Login/>}</Route>
        <Route path="/register" >{user ? <Redirect to="/" /> : <Register />}</Route>
    
      </Switch>
      <Footer />
    </BrowserRouter>

  )
}

export default App;
