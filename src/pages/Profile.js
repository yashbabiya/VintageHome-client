import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { URL } from '../helpers/API'

export default function Profile() {
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const logout = () =>{
    toast.promise(axios.delete(URL+'user/logout'),
    {
      loading:"...",
      success:()=>{
        dispatch({
          type:"LOGOUT"
        })
        navigate('/')
        window.location.reload(false);
        return "Logout Successfully"
      },
      error:()=>{
        return "Didn't Logout"
      }
    })
  }
  return (
    <div className='page profile'>
        <button onClick={logout}>Logout</button>
    </div>
  )
}
