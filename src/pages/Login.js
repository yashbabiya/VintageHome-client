import { Tab, Tabs } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../helpers/API'
import LoginBg from '../imgs/login-bg.jpg'
export default function Login() {

    const user = useSelector(state=>state.user)
    const navigate = useNavigate()
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [role,setRole] = useState("BUYER")

    const dispatch = useDispatch()

    const handleChange = (event, newValue) => {
        setRole(newValue);
      };


    const login = () =>{
        const body={username,password,role}

        toast.promise(axios.post(URL+'user/login',body,{withCredentials:true}),
        {
            loading:"Wait ...",
            success:(res)=>{
                dispatch({
                    type:"LOGIN",
                    payload:res?.data
                })
                dispatch({
                    type:"UPDATE_CART_ITEM",
                    payload:res?.data.cart.items
                })
                navigate('/')
                return "Welcome "+username+"!";
            },
            error:(err)=>{
                navigate('/')
                return err?.response?.data
            }
        }
        )
    }
  return (
    <div className='page login'>
        <div className="left">

        <h1 className='serif'>Login</h1>
        <div className="form">

        <Tabs
        value={role}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value="BUYER" label="Buyer" />
        <Tab value="SELLER" label="Seller" />
      </Tabs>

            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} id="username" type="text" />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" type="password" />
            </div>
            <button onClick={login}>Login</button>
        <Link to='/signup'>Create a new Account</Link>
        </div>
        </div>

        {/* <div className="right">
            <img src={LoginBg} alt="" />
        </div> */}
        
    </div>
  )
}
