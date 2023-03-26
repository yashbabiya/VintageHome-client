import { MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../helpers/API";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Upload, UploadFile } from "@mui/icons-material";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setusername] = useState(user.username);
  const [email, setemail] = useState(user.email);
  const [phone, setphone] = useState(user.phone);
  const [imgUrl, setImgUrl] = useState(user.avatar);
  const [password, setpassword] = useState(user.avatar);

  const [role, setRole] = useState("BUYER");

  const [progresspercent, setProgresspercent] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) {
      const reqBody = {
        username,
        email,
        phone,
        avatar: imgUrl,
        password,
        role:role
      };
      axios
        .post(URL + "user/signup", reqBody, { withCredentials: true })
        .then((res) => {
          toast.success("User created successfully")
          navigate('/login')
          dispatch({
            type: "UPDATEUSER",
            payload: reqBody,
          });
        });
    }

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          const reqBody = {
            username,
            email,
            phone,
            avatar: downloadURL,
            password,
            role:role
          };
          axios
            .post(URL + "user/signup", reqBody, { withCredentials: true })
            .then((res) => {
              toast.success("User created successfully")
              navigate('/login')
              console.log("here", res.data);
            });
        });
      }
    );
  };
    

  return (
    <div className="page profile">
      <h1 className="serif">Signup</h1>
      <div className="box">
        <form onSubmit={handleSubmit} className="form box">
          <div className="box">
            <div className="left imgHolder">
              <img src={imgUrl} alt="" />
              {!imgUrl && <label for="image" className="box"> <UploadFile /> Upload Your Profile Image Here</label>}
              <input
              id="image"
                type="file"
                style={{display:"none"}}
                onChange={(e) => {
                  console.log("e.originalEvent.dataTransfer",e.originalEvent.dataTransfer)
                  var reader = new FileReader();
                  var url = reader.readAsDataURL(e.target?.files[0]);
                  reader.onloadend = function (e) {
                    setImgUrl(reader.result);
                  }.bind(this);
                }}
              />
            </div>
            <div className="right">
              <div className="form box">
                <div className="flex">
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  defaultValue={user.username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  defaultValue={user.password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                </div>
                <div className="flex">

                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  defaultValue={user.email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  defaultValue={user.phone}
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                />
                </div>

                <Select
          value={role}
          onChange={(e)=>{
            setRole(e.target.value)
          }}
          displayEmpty
          defaultValue={"BUYER"}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{minWidth:150}}
        >
          {[{label:"Buyer",value:"BUYER"},{label:"Seller",value:"SELLER"}].map((cat)=><MenuItem value={cat.value}>{cat.label}</MenuItem>)}
        </Select>
              </div>
            </div>
          </div>

          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}
