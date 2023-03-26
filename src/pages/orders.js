import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import OrderComponent from '../components/OrderComponent'
import { URL } from '../helpers/API'

export default function Orders() {

  const [orders,setOrders] = useState()

  const fetchMyOrders = () =>{
    axios.get(URL+'product/getMyOrders',{withCredentials:true}).then((res)=>{
        setOrders(res.data);
    })
  }
  useEffect(()=>{
    fetchMyOrders()
  },[])
  return (
    <div className='page'>
        <h1 className="serif">
            Order
        </h1>
        <div className="orderWrapper box">
            {
                orders === undefined? <Loader/> :
                !orders?.length ? <>You don't have any orders</> : orders?.map((order)=><OrderComponent {...order}/>)
            }
        </div>
    </div>
  )
}
