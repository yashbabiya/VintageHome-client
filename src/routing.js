import React from 'react'
import { useSelector } from 'react-redux'
import { redirect, Route, Routes } from 'react-router-dom'
import Lost from './pages/404'
import AdminLogin from './pages/AdminLogin'
import Cart from './pages/Cart'
import CreateProduct from './pages/CreateProduct'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Login from './pages/Login'
import MyProducts from './pages/MyProducts'
import Orders from './pages/orders'
import Product from './pages/Product'
import Profile from './pages/Profile'
import Seller from './pages/Seller'
import Sellers from './pages/Sellers'
import Signup from './pages/Signup'
import Welcome from './pages/Welcome'

export default function Routing() {
  const user = useSelector((state)=>state.user);
  return (
    <Routes>

          <Route exact path="/" element={( user.role==="SELLER" || user.role==="ADMIN") ? <Welcome /> : <Home />} />
          {user.isUserLoggedIn && <Route exact path="/profile" element={<Profile/>} />}
          <Route exact path="/explore/:title" element={<Explore/>} />
          <Route exact path="/sellers" element={<Sellers />} />
          <Route exact path="/seller/:id" element={<Seller />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />


          {user.isUserLoggedIn && <Route exact path="/orders" element={<Orders />} />}
          <Route exact path="/create" element={<CreateProduct />} />
          <Route exact path="/myProducts" element={<MyProducts />} />


          <Route exact path="/admin/login" element={<AdminLogin />} />



          {!user.isUserLoggedIn && <Route exact path="/login" element={<Login/>} />}
          {!user.isUserLoggedIn && <Route exact path="/signup" element={<Signup/>} />}
          <Route path='*' element={<Lost />} />
    </Routes>
  )
}
