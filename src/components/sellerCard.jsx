import React from 'react'
import { Link } from 'react-router-dom'

export default function SellerCard(seller) {
  return (
    <div className='seller-card'>
    <Link to={`/seller/${seller._id}`} state={{seller}}>
        <img src={seller.avatar} alt="" />
        <h3 className='serif'>{seller.username}</h3>
    </Link>
    </div>
  )
}
