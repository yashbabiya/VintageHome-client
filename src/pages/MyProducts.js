import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { URL } from '../helpers/API';

export default function MyProducts() {

    const user = useSelector((state)=>state.user)
    const [products,setProducts] = useState();
    const [isLoading,setIsLoading] = useState(false);

  const fetchMyProducts = () =>{
    setIsLoading(true)
    axios.get(URL+`product/search?seller=${user?._id}`).then((res)=>{
        setProducts(res?.data)
        setIsLoading(false)

    }).catch((e)=>{
        toast.error("Error occured")
        setIsLoading(false)

    })
  }

  useEffect(()=>{
    fetchMyProducts()
  },[])
  return (
    <div className='page explore'>
        <h1 className="serif">My Products</h1>
        <div className="allProducts">
          {isLoading ?
            <Loader />
          :
            products?.map((product,index)=><ProductCard {...{...product, seller :product?.seller?._id ? product.seller : product}} key={index}/>)
          }
        </div>
    </div>
  )
}
