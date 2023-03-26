import { useSelect } from "@mui/base";
import { Add, AddCircle, HdrPlusOutlined, Remove, RemoveCircle } from "@mui/icons-material";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../helpers/API";
import Loader from "./Loader";

export default function AddToCartButton({ product }) {
  const cart = useSelector((state)=>state.cart)
  const user = useSelector((state)=>state.user)
  const [isLoading,setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const isProductInCart = () => {
    const answer = cart?.length && cart?.find((prd) => prd?.product?._id === product._id)?.qty;
    return answer;
  };
  const addToCart =(qty)=>{
    const reqBody = {
      productId:product._id,
      qty:qty ?? 0
    }
    setIsLoading(true)
    axios.post(URL+`user/addToCart`,reqBody,{withCredentials:true}).then(()=>{
      let _cart = _.cloneDeep(cart)
      const i = _cart.findIndex((item)=>item.product._id === product._id)
      if(i===-1)
      _cart.push({product:product,qty:qty})
      else
      _cart[i].qty = qty;
      setIsLoading(false)
      dispatch({
        type:"ADD_TO_CART",
        payload:_cart
      })

    }).catch(()=>{
      setIsLoading(false)

    })
  }
  const productQty = isProductInCart();
  const isProductCollectible = product?.type === "collectables";
  return user?.role === "BUYER" && (productQty ? isProductCollectible ? (
    <button className="outline-btn" onClick={()=>addToCart(productQty-1)}>
        Remove From Cart
    </button>
  ) : (
    <div className="cart-qty">
      <Add onClick={()=>addToCart(productQty+1)} sx={{fontSize:30}}/>
        <span>{isLoading ? <div className="spinner" /> : productQty}</span>
      <Remove onClick={()=>addToCart(productQty-1)} sx={{fontSize:30}}/>
    </div>
  ) : (
    <button className="outline-btn" onClick={()=>addToCart(1)}>Add To Cart</button>
  ))
}
