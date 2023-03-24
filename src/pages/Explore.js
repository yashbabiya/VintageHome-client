import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem, TextField } from '@mui/material';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { URL } from '../helpers/API';
import Loader from '../components/Loader';

export default function Explore() {

  const [category,setCategory] = useState();
  const [searchText,setSearchText] = useState();
  const [products,setProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(false);


  const {title} = useParams()
  const allCategories = title==="collectibles" ?
  [
    {label:"Comics",value:"comics"},
    {label:"History",value:"history"},
    {label:"Sports",value:"sports"},
    {label:"Autographs",value:"autographs"},
    {label:"Coins",value:"coins"},

  ]
  :[
    {label:"Paintings",value:"paintings"},
    {label:"Sculptures",value:"sculptures"},
    {label:"Clocks",value:"clocks"},
    {label:"Furniture",value:"furniture"},
  ]
  
  useEffect(()=>{
    fetchProduct()
  },[title])

  useEffect(()=>{
    searchProduct()
  },[category])

  const searchProduct = () =>{
    setIsLoading(true)
    axios.get(URL+`product/search?type=${title}&category=${category ?? ""}&keyword=${searchText || ""}`).then((res)=>{
      setProducts(res.data) 
      setIsLoading(false)
    }).catch(()=>{
      setProducts([]) 
      setIsLoading(false)
    })
  }
  const fetchProduct =()=>{
    setIsLoading(true)
    axios.get(URL+`product/search?type=${title}`).then((res)=>{
      setProducts(res.data)
      setIsLoading(false)
    }).catch(()=>{
      setProducts([]) 
      setIsLoading(false)
    })
  }

  return (
    <div className='explore page'>
        <h1 className='serif'>{title}</h1>
        <div className='search-wrap'>
        <TextField id="standard-basic" onKeyDown={(e)=>{if(e.key === 'Enter'){
          searchProduct()
        }}} sx={{width:"100%",maxWidth:300, marginRight:2}} value={searchText} onChange={(e)=>setSearchText(e.target.value)} label="Search ..." variant="outlined"/>
        <Select
          value={category}
          onChange={(e)=>{
            setCategory(e.target.value)

          }}
          displayEmpty
          defaultValue={""}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{minWidth:150}}
        >
          <MenuItem value="">
            All
          </MenuItem>
          {allCategories.map((cat)=><MenuItem value={cat.value}>{cat.label}</MenuItem>)}
        </Select>
        </div>
        <div className="allProducts">
          {isLoading ?
            <Loader />
          :
            products.map((product,index)=><ProductCard {...product} showCartButton={true} key={index}/>)
          }
        </div>
    </div>
  )
}
