import React from 'react'
import { Link } from 'react-router-dom'
import AddToCartButton from './AddToCartButton'

export default function ProductCard(props) {
  return (
    <div className='product-card' key={props.key}>
      <Link to={`/product/${props._id}`} state={{product:props}}  >
        <img src={props.imgs} alt="" />
        <div>
        <h2 className='serif'>{props.name}</h2>
        <p>$ {props.price}</p>
        </div>
      </Link>
        <AddToCartButton product={props}/>
    </div>
  )
}
