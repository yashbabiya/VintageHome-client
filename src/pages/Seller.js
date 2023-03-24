import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Seller() {
  const {id} = useParams();
  const {state} = useLocation();
  console.log("state",state)
  const {seller} = state;
  return (
    <div className='page seller-page'>
      <div className="details">
        <div className="top">
      <img src={seller.avatar} alt="" />

        </div>
        <div className="bottom">

      {seller.username}
        </div>
      </div>
      <div className="products">
        <h2>Products by seller</h2>
        <div className="productss">
          {
            seller.allProducts?.map((product)=><ProductCard {...product} showCartButton={true}/>)
          }
        </div>
      </div>
    </div>
  )
}
