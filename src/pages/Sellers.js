import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import SellerCard from '../components/sellerCard';
import { URL } from '../helpers/API';

export default function Sellers() {
  const [sellers,setSellers] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const fetchSellers = ()=>{
    setIsLoading(true)
    axios.get(URL+'admin/sellers').then((res)=>{
      setSellers(res.data);
      setIsLoading(false)
    }).catch(()=>{
      setIsLoading(false)
    })
  }
  useEffect(()=>{
    fetchSellers()
  },[])
  return (
    <div className='page'>
      <h1 className='serif'>Sellers</h1>
      {isLoading && <Loader />}
      <div className='sellers-list'>
      {
        sellers.map((seller,index)=><SellerCard index={index} {...seller}/>)
      }
      </div>
    </div>
  )
}
