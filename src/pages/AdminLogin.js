import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { URL } from '../helpers/API'

export default function AdminLogin() {
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = () =>{
        const body={username,password,role:"ADMIN"}

        toast.promise(axios.post(URL+'user/login',body,{withCredentials:true}),
        {
            loading:"Wait ...",
            success:(res)=>{
                dispatch({
                    type:"LOGIN",
                    payload:res?.data
                })
                navigate('/')
                return "Welcome "+username+"!";
            },
            error:(err)=>{
                console.log("err",err)
                return err?.response?.data
            }
        }
        )
    }
  return (
    <div className='page'>
        <h1 className='serif'>Login</h1>
        <div className="form">

            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} id="username" type="text" />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} id="password" type="password" />
            </div>
            <button onClick={login}>Login</button>
            </div>
    </div>
  )
}
