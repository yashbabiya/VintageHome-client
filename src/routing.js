import React from 'react'
import { useSelector } from 'react-redux'
import { redirect, Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product'
import Profile from './pages/Profile'
import Sellers from './pages/Sellers'
import Signup from './pages/Signup'

export default function Routing() {
  const user = useSelector((state)=>state.user);
  console.log("user",user)
  return (
    <Routes>
          <Route exact path="/" element={<Home/>} />
          {user.isUserLoggedIn && <Route exact path="/profile" element={<Profile/>} />}
          <Route exact path="/explore/:title" element={<Explore/>} />
          <Route exact path="/sellers" element={<Sellers />} />
          <Route exact path="/product/:id" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />




          {!user.isUserLoggedIn && <Route exact path="/login" element={<Login/>} />}
          {!user.isUserLoggedIn && <Route exact path="/signup" element={<Signup/>} />}
    </Routes>
  )
}
