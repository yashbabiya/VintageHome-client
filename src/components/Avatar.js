import React from 'react'

export default function Avatar(props) {
  return (
    <div className='avatar'>
        <img src={props.img || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
        
    </div>
  )
}
