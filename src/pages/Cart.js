import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CartCard from '../components/CartCard';
import {URL} from '../helpers/API'
export default function Cart() {
  const cartData = useSelector((state)=>state.cart)
  const calculateTotal=()=>{
    let ans = 0;
    cartData?.forEach((item)=>{
      const priceOfProduct = item.product.price
      const qty = item.qty;
      ans+=priceOfProduct*qty;
    })
    setTotal(ans)
  }
  useEffect(()=>{
    calculateTotal()
  },[cartData])
  const [total,setTotal] = useState(0);
  return (
    <div className='page cartPage'>
      <h1 className="serif">Cart</h1>
      <div className="products">

      {
        cartData?.map((item)=>(
          item.qty>0 && <CartCard 
          img={item.product.imgs}
          qty={item.qty}
          name={item.product.name}
          product={item.product}
          />
          ))
        }
        </div>
      <h2 className='total'>Total Price : <b>{total}</b></h2>
    </div>
  )
}
