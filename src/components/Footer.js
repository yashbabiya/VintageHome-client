import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <div className='footer'>
      <Link to='/'><Logo/></Link>
      <nav>
        <Link to='/'>Shop</Link>
        <Link to='/'>Explore</Link>
        <Link to='/'>Login</Link>
      </nav>
      <p>2023-24 © All rights Reserved</p>
    </div>
  )
}
