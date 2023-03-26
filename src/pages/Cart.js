import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import CartCard from '../components/CartCard';
import PageLoader from '../components/PageLoader';
import {URL} from '../helpers/API'
export default function Cart() {
  const cartData = useSelector((state)=>state.cart)
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState();
  const calculateTotal=()=>{
    let ans = 0;
    if(cartData?.length)
    cartData?.forEach((item)=>{
      const priceOfProduct = item.product.price
      const qty = item.qty;
      ans+=priceOfProduct*qty;
    })
    setTotal(ans)
  }
  useEffect(()=>{
    calculateTotal()
    console.log("cart",cartData)
  },[cartData])

  const fetchCartData = ()=>{
    axios.get(URL+'user/cart',{withCredentials:true}).then((res)=>{
      dispatch({
        type:"UPDATE_CART",
        payload:res.data
      })
    })
  }

  const placeOrder = () =>{
    let filtered = cartData.filter((item)=>item.qty);
    setIsLoading(true);
    const reqBody = {
      items:filtered
    }
    axios.post(URL+'product/placeOrder',reqBody,{withCredentials:true}).then(()=>{
      toast.success("Order placed successfully")
      setIsLoading(false);
    }).catch((e)=>{
      toast.error("Error Occured")
      setIsLoading(false);
    })
  }
  const [total,setTotal] = useState(0);
  useEffect(()=>{
    fetchCartData()
  },[])
  return (
    <div className='page cartPage'>
      {isLoading && <PageLoader/>}
      <h1 className="serif">Cart</h1>
      {
        (!cartData?.length ||!cartData?.filter((item)=>item.qty)?.length) ?
        <>Your Cart Is Empty</>
        :<div className='product-list'>
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
        <button onClick={()=>placeOrder()}>Place Order</button>
      </div>
        }
    </div>
  )
}
