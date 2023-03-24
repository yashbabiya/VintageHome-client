import { Check, Verified } from '@mui/icons-material';
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import AddToCartButton from '../components/AddToCartButton';
import SellerCard from '../components/sellerCard';

export default function Product() {
  const {id} = useParams();
  const {state} = useLocation();
  const {product} = state;
  return (
    <div className='product-page'>
      <div className="top flex">
        <div className="left">
          <img src={product.imgs} alt="" />
        </div>
        <div className="right">
          <h1 className='serif'>{product.name}</h1>
          <p>${product.price}</p>
          <span>{product?.isApproved &&<><Verified /> Admin Approved</>}</span>
          <AddToCartButton product={product}/>
          <div className="sellerinfo">
            <img src={product.seller.avatar} alt="" />
            <b>{product.seller.username}</b>
          </div>
        </div>
      </div>
      <div className="about">
        <h1 className='serif'>About</h1>
        <p>{product.description}</p>
      </div>
    </div>
  )
}
