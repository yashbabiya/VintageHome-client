import React from "react";
import Painting from "../imgs/190324.jpg";
import Gramophone from "../imgs/gramophone.png";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
export default function Home() {
  const dispatch = useDispatch()
  const products = [
    {
      img:"https://upload.wikimedia.org/wikipedia/commons/e/e2/Coin_of_Queen_Tamar_1200_AD.png",
      name:"Coin of Queen Tamar",
      price:"$ 200"
    },
    {
      img:"https://upload.wikimedia.org/wikipedia/commons/e/e2/Coin_of_Queen_Tamar_1200_AD.png",
      name:"Coin of Queen Tamar",
      price:"$ 200"
    },
    {
      img:"https://upload.wikimedia.org/wikipedia/commons/e/e2/Coin_of_Queen_Tamar_1200_AD.png",
      name:"Coin of Queen Tamar",
      price:"$ 200"
    }
  ]
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
      {/* <div className="recents">
        <h1 className="serif">Recents</h1>
        <div className="products">
          {products.map(product=><div className="Card" onMouseEnter={()=>dispatch({type:"MAKE_BIG"})} onMouseLeave={()=>dispatch({type:"MAKE_NORMAL"})}>
            <img src={product.img} alt="" />
            <div className="info">

            <h2 className="serif">{product.name}</h2>
            <p>{product.price}</p>
            </div>
          </div>)}
        </div>
      </div> */}
    </div>
  );
}
