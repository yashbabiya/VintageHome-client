import { Cancel, CancelPresentation, CancelSharp, Email, Phone, Remove } from '@mui/icons-material'
import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from './Avatar'
import OrderProgressBar from './orderProgressBar'

export default function OrderComponent(order) {
    const user = useSelector(state=>state.user)
    const sellerInfo = order.seller;
    const buyerInfo = order.user;

  return (
    <div className='order-component'>
        <div className="items">
            {
                order.items?.map((item)=>{
                    return(
                        <div className='item-card'>
                            <span><b>{item.qty}</b>X</span>
                            <div className="img">
                            <img src={item.product.imgs} alt="" />
                            </div>
                            <div className="info">
                                <p>{item.product.name}</p>
                                <p>${item.product.price}</p>
                            </div>
                        </div>
                    )
                })
                
            }
        </div>
        {user.role === "SELLER" ? <div className="buyerInfo">
            <h3 className='serif'>Buyer Info</h3>
            <div className="info">
                <div className="name">

                <div className="img"><Avatar img={buyerInfo.avatar} /></div>
                {buyerInfo?.username}
                </div>
                <div className="contact"><Phone />{buyerInfo?.phone}</div>
                <div className="email"><Email />{buyerInfo?.email}</div>
            </div>

        </div>:
        <div className="sellerInfo">
            <h3 className='serif'>Seller Info</h3>
            <div className="info">
                <div className="name">

                <div className="img"><Avatar img={sellerInfo.avatar} /></div>
                {sellerInfo?.username}
                </div>
                <div className="contact"><Phone />{sellerInfo?.phone}</div>
                <div className="email"><Email />{sellerInfo?.email}</div>
            </div>
        </div>}
        <OrderProgressBar order={order}/>
    </div>
  )
}
