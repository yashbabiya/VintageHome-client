import { useSelect } from "@mui/base";
import { Add, AddCircle, HdrPlusOutlined, Remove, RemoveCircle } from "@mui/icons-material";
import axios from "axios";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../helpers/API";

export default function AddToCartButton({ product }) {
  const cart = useSelector((state)=>state.cart)
  const dispatch = useDispatch()
  const isProductInCart = () => {
    const answer = cart?.find((prd) => prd.product._id === product._id)?.qty;
    return answer;
  };
  const addToCart =(qty)=>{
    const reqBody = {
      productId:product._id,
      qty:qty ?? 0
    }
    axios.post(URL+`user/addToCart`,reqBody,{withCredentials:true}).then(()=>{
      let _cart = _.cloneDeep(cart)
      const i = _cart.findIndex((item)=>item.product._id === product._id)
      if(i===-1)
      _cart.push({product:product,qty:qty})
      else
      _cart[i].qty = qty;
      dispatch({
        type:"ADD_TO_CART",
        payload:_cart
      })

    }).catch(()=>{

    })
  }
  const productQty = isProductInCart();
  const isProductCollectible = product.type === "collectables";
  return productQty ? isProductCollectible ? (
    <div className="cart-qty">
        <span>Already Added Into Cart</span>
    </div>
  ) : (
    <div className="cart-qty">
      <Add onClick={()=>addToCart(productQty+1)} sx={{fontSize:30}}/>
        <span>{productQty}</span>
      <Remove onClick={()=>addToCart(productQty-1)} sx={{fontSize:30}}/>
    </div>
  ) : (
    <button className="outline-btn" onClick={()=>addToCart(1)}>Add To Cart</button>
  );
}
