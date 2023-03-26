import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SellerCard(seller) {
  const [showInfo,setShowInfo] = useState(false);
  console.log("sssss",seller)
  return (
    <div key={seller.index} className='seller-card' onMouseEnter={()=>{setShowInfo(true)}} onMouseLeave={()=>setShowInfo(false)}>
    <div className='stats' style={{opacity:showInfo ? 1 : 0}}>Total Products : {seller?.allProducts?.length}</div>
    <Link to={`/seller/${seller._id}`} state={{seller}}>
        <img src={seller.avatar} alt="" />
        <h3 className='serif'>{seller.username}</h3>
    </Link>
    </div>
  )
}
