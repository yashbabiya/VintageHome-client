import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SellerCard from '../components/sellerCard';
import { URL } from '../helpers/API';

export default function Sellers() {
  const [sellers,setSellers] = useState([]);
  const fetchSellers = ()=>{
    axios.get(URL+'admin/sellers').then((res)=>{
      setSellers(res.data);
    }).catch(()=>{
      
    })
  }
  useEffect(()=>{
    fetchSellers()
  },[])
  return (
    <div>
      <h1 className='serif'>Sellers</h1>
      <div className='sellers-list'>
      {
        sellers.map((seller)=><SellerCard {...seller}/>
        )
      }
      </div>
    </div>
  )
}
