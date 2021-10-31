import React, {useState } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { logout } from '../redux/apiCalls'

const Navigation = () => {

  const cartStyle = {
    background: "#E6E6E6",
    display: "flex",
    alignItems:'center',
    padding: " 4px 10px",
    borderRadius: "50px"
  }
  const cartText = {
    color: "#3D56B2",
    fontWeight:"600",
  }
  const dispatch = useDispatch()
  const isUser =useState(useSelector(state=>state.user.isUser))
  const quantity =useSelector(state=>state.cart.quantity)


  const logOut = () => {
    logout(dispatch)
  }

  console.log(isUser[0])
  return (
    <>

      <nav className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
          <img
            style={{ height: 45 }}
            src="/images/icons8_dolphin.ico"
            alt="logo"
          />
          <i><h1 className="text-xl md:text-3xl font-bold text-logo-blue ml-4">Dolphin Polymers</h1></i>
          </Link>
          <ul className="flex items-center">
            <li><Link to="/">Home</Link></li>
          <li className="ml-6">{isUser[0] ? <h2 onClick={logOut}>Logout</h2> : <Link to="/login">Login</Link>  }</li>
            <li className="ml-6"><Link to="/products">Products</Link></li>
            <li className="ml-6"><Link to="/orders">Orders</Link></li>
            {/* <li className="ml-6"><Link to="/settings">Setting</Link></li> */}
            <li className="ml-6">
              <Link to="/cart">
                <div style={cartStyle}>
                <span style={cartText}>{ quantity }</span>
                  <img className="ml-2" src="/images/icons8_shopping_cart.ico" alt="cart-icon" />
                </div>
              </Link>
            </li>
          </ul>
      </nav>

    </>
  )
}

export default Navigation;
