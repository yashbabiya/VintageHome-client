import { ShoppingBag } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Logo from "./Logo";

export default function Header() {
  const user = useSelector((state)=>state.user)
  
  return (
    <div className="header max-width">
      <nav>
        <Link to="/"><Logo/></Link>
        <div className="flex">

        <Link to='/explore/artwork' className="serif">Antiques</Link>
        <Link to='/explore/collectibles' className="serif">Collectibles</Link>
        <Link to='/sellers' className="serif">View Sellers</Link>
        </div>
        <div className="flex">
        {!user.isUserLoggedIn && <Link to="/login" className="serif">Login</Link>}
        {user.isUserLoggedIn && <Link to="/profile"><Avatar img={user.avatar}/></Link>}
        {user.isUserLoggedIn && <Link to="/cart"><ShoppingBag sx={{fontSize:40}} /></Link>}
        </div>
        
      </nav>
    </div>
  );
}
