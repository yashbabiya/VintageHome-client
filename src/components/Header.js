import { ShoppingBag } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../helpers/API";
import Avatar from "./Avatar";
import Logo from "./Logo";

export default function Header() {
  const user = useSelector((state)=>state.user)
  const role = user?.role;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () =>{
    toast.promise(axios.delete(URL+'user/logout',{withCredentials:true}),
    {
      loading:"...",
      success:()=>{
        dispatch({
          type:"LOGOUT"
        })
        dispatch({
          type:"UPDATE_CART_ITEM",
          payload:[]
        })
        navigate('/')
        window.location.reload(false);
        return "Logout Successfully"
      },
      error:()=>{
        return "Didn't Logout"
      }
    })
  }
  return (
    <div className="header max-width">
      <nav>
        <Link to="/"><Logo/></Link>
        <div className="flex">

        {(!user.isUserLoggedIn || role === "BUYER") && <Link to='/explore/artwork' className="serif">Antiques</Link>}
        {(!user.isUserLoggedIn || role === "BUYER") &&<Link to='/explore/collectables' className="serif">Collectables</Link>}
        {(!user.isUserLoggedIn || role === "BUYER") && <Link to='/sellers' className="serif">View Sellers</Link>}
        {( role === "BUYER") && <Link to='/orders' className="serif">My Orders</Link>}


        </div>
        <div className="flex">

        {(role === "ADMIN") && <Link to='/explore/artwork' className="serif">Antiques</Link>}
        {( role === "ADMIN") &&<Link to='/explore/collectables' className="serif">Collectables</Link>}
        {( role === "ADMIN") && <Link to='/sellers' className="serif">View Sellers</Link>}


        {role === "SELLER" &&<Link to='/orders' className="serif">My Orders</Link>}
        {role === "SELLER" && <Link to='/myProducts' className="serif">Manage Products</Link>}
        {role === "SELLER" && <Link to='/create' className="serif">Create a new Product</Link>}
        {(role === "SELLER" || role ==="ADMIN") && <button onClick={()=>logout()}>Logout</button>}

        {!user.isUserLoggedIn && <Link to="/login" className="serif">Login</Link>}
        {user.isUserLoggedIn && role === "BUYER" && <Link to="/profile"><Avatar img={user.avatar}/></Link>}
        {user.isUserLoggedIn && role === "BUYER" && <Link to="/cart"><ShoppingBag sx={{fontSize:40}} /></Link>}
        </div>
        
      </nav>
    </div>
  );
}
