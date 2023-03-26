import { Email, Phone } from "@mui/icons-material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { URL } from "../helpers/API";

export default function Seller() {
  const { id } = useParams();
  const { state } = useLocation();
  const user = useSelector((state) => state.user);
  const { seller } = state;
  const banSeller = () => {
    if (window.confirm("Are You sure you want to ban this seller")) {
      axios
        .put(URL + "admin/banSeller", { userId: id }, { withCredentials: true })
        .then(() => {
          toast.success("User got banned");
        })
        .catch(() => {
          toast.error("error occured");
        });
    }
  };
  return (
    <div className="page seller-page">
      <div className="details">
        
        {!seller.isBanned && user.role === "ADMIN" && (
          <button onClick={() => banSeller()}>Ban User</button>
        )}
        <div className="top">
          <img src={seller.avatar} alt="" />
        </div>
        <div className="info-of-seller">
          <h1 className="serif">{seller.username}</h1>
          {seller.isBanned && <span className="warning-status">Banned</span>}
          <div className="contact"><Phone />{seller?.phone}</div>
          <div className="email"><Email />{seller?.email}</div>
        </div>
      </div>
      <div className="products">
        <h2>Products by seller</h2>
        <div className="productss">
          {}
          {seller.allProducts
            ?.filter((x) => !x.isDeleted)
            .map((product) => (
              <ProductCard {...{...product,seller:seller}} showCartButton={true} />
            ))}
        </div>
      </div>
    </div>
  );
}
