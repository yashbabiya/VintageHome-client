import React from 'react'

export default function OrderComponent(order) {
  return (
    <div>
        <h2> # Order</h2>
        <div className="items">
            {
                order.items?.map((item)=>{
                    return(
                        <div>
                            <span>{item.qty}</span>
                            <img src={item.product.imgs} alt="" />
                            <div className="info">
                                <p>{item.product.name}</p>
                                <p>{item.product.price}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
