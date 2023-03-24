import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../helpers/API'
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


export default function Profile() {
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [username,setusername] = useState(user.username)
  const [email,setemail] = useState(user.email)
  const [phone,setphone] = useState(user.phone)
  const [imgUrl, setImgUrl] = useState(user.avatar);
  const [progresspercent, setProgresspercent] = useState(0);

const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]

    if (!file){
      const reqBody = {
        username,
        email,
        phone,
        avatar:imgUrl
      }
      axios.put(URL+'user/edit',reqBody,{withCredentials:true}).then((res)=>{
        dispatch({
          type:"UPDATEUSER",
          payload:reqBody
        })
      })
    };

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          const reqBody = {
            username,
            email,
            phone,
            avatar:downloadURL
          }
          axios.put(URL+'user/edit',reqBody,{withCredentials:true}).then((res)=>{
            
            console.log("here",res.data)
          })
        });
      }
    );
  }

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
      <div className="box">

      <form onSubmit={handleSubmit} className='form box' >
        <div className="top">
          <div className="left">
              <img src={user.avatar} alt="" />
          <input type='file' />
          </div>
          <div className="right">
              <div className="form box">
                <TextField id="outlined-basic" label="Username" variant="outlined" defaultValue={user.username} onChange={(e)=>{setusername(e.target.value)}}/>
                <TextField id="outlined-basic" label="Email" variant="outlined" defaultValue={user.email} onChange={(e)=>{setemail(e.target.value)}}/>
                <TextField id="outlined-basic" label="Phone" variant="outlined" defaultValue={user.phone} onChange={(e)=>{setphone(e.target.value)}}/>

              </div>
          </div>
        </div>

        <button type='submit'>Update Changes</button>

        </form>
      <div className="bottom">
        <Link to='/orders'>Go to Your Order Page</Link>
        <button onClick={logout}>Logout</button>
      </div>
      </div>
    </div>
  )
}
