import React from 'react'
import AddToCartButton from './AddToCartButton'

export default function CartCard(props) {
  return (
    <div className='flex cart-card'>
        <div>
            <AddToCartButton product={props.product}/>
        </div>
        <img src={props.img} alt="" />
        <div className='info'>

        <h2 className="serif">{props.name}</h2>
        <span>${props.product.price}</span>
        </div>
    </div>
  )
}
