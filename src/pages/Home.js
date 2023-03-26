import React, { useEffect, useState } from "react";
import Painting from "../imgs/190324.jpg";
import Gramophone from "../imgs/gramophone.png";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { URL } from "../helpers/API";
export default function Home() {
  const dispatch = useDispatch()
  const [products,setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAllProducts = () =>{
    setIsLoading(true)
    axios.get(URL+'product/getAll?limit=5').then((res)=>{
      setProducts(res.data)
      setIsLoading(false)
    }).catch((err)=>{
      setIsLoading(false)
      alert("error occured")
    })
  }
  useEffect(()=>{
    fetchAllProducts()
  },[])
  return (
    <div className="home max-width">
      <div className="hero">
        <div className="left">
          <motion.h1
            className="serif"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2, type: "just", delay: 1 }}
          >
            The Antique
          </motion.h1>
          <div className="flex">
            <motion.h1
              className="serif"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, ease: "linear", delay: 1.2 }}
            >
              Shop
            </motion.h1>
            <motion.p
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, ease: "linear", delay: 1.4 }}
            >
              It is not just a place to buy things, it's a journey through
              history, where every object tells a story.
            </motion.p>
          </div>
        </div>
        <div className="hero-bg">
          <motion.img
            src={Painting}
            alt=""
            initial={{ opacity: 0, width: "100%" ,height:800}}
            animate={{ opacity: 0.5, width: "80%",objectFit:"cover" }}
            transition={{ duration: 1, ease: "anticipate" }}
          />
        </div>
      </div>
      <div className="collectibles">
        <div className="left">
          <motion.img
            src={Gramophone}
            alt=""
            initial={{scaleX:-1}}
            animate={{y:[0,10,0,-10,0]}}
            transition={{type: "keyframes",duration:2,repeat: Infinity, ease:"linear"}}
          />
        </div>
        <div className="right">
          <h1 className="serif">Explore Collectibles & Antiques</h1>
          <p>
          Collecting is an obsession, a disease, an addiction, and a hobby all rolled into one.
          </p>
        </div>
      </div>
      <div className="recents">
        <h2 className="serif" style={{ margin: "2em 0" }}>
          Recent Products
        </h2>
        <div style={{justifyContent:"flex-start"}} className="orders flex scroll-x">
          {isLoading && <Loader />}

          { !isLoading && (!products?.length ? <>No Products</> : products?.map((product, index) => (
            <ProductCard {...product} />
          )))}
        </div>
      </div>
      
    </div>
  );
}
