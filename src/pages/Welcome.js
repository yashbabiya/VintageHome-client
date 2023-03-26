import { Email, Phone } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { URL } from "../helpers/API";
import { getStatusOfOrder } from "../helpers/getStatusOfOrder";

export default function Welcome() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [products,setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMyOrders = () => {
    setIsLoading(true);
    axios
      .get(URL + "product/getMyOrders", { withCredentials: true })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const calculateTotal = (order) => {
    let ans = 0;
    order?.forEach((item) => {
      const priceOfProduct = item.product.price;
      const qty = item.qty;
      ans += priceOfProduct * qty;
    });
    return ans;
  };
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
  const GrandTotal = ()=>{
    let ans = 0;
    orders?.length && orders.forEach((order)=>{
      ans += calculateTotal(order.items);
    })
    return ans;
  }
  useEffect(() => {
    user.role === "ADMIN" ? fetchAllProducts() : fetchMyOrders();
  }, []);
  return (
    <div className="page welcome">
      <h1 className="serif" style={{ textAlign: "center", margin: "1em 0" }}>
        Welcome !!!
      </h1>
      <div className="details">
        <div className="top">
          <img src={user.avatar} alt="" />
        </div>
        <div className="info-of-seller">
          <h1 className="serif">{user.username}</h1>
          {user.isBanned && <span className="warning-status">Banned</span>}
          <div className="contact">
            <Phone />
            {user?.phone}
          </div>
          <div className="email">
            <Email />
            {user?.email}
          </div>
        </div>
      </div>

      {user.role === "SELLER" && <div className="information">
        <div className="serif"> <h1 className="serif">{user?.products?.length}</h1> <p>Total Products</p></div>
        <div className="serif"><h1 className="serif">{orders?.length}</h1> <p>Total Orders</p> </div>
        <div className="serif"><h1 className="serif">${GrandTotal()}</h1> <p>Amount Earned</p> </div>

      </div>}
      {user.role === "SELLER" ?<div className="recents">
        <h2 className="serif" style={{ margin: "2em 0" }}>
          Recent Orders
        </h2>
        <div className="orders flex scroll-x">
          {isLoading && <Loader />}

          { !isLoading && (!orders?.length ? <>You don't have any Orders</> : orders?.map((ord, index) => (
            <div key={index} className="recent-order-card">
              <div className="items">
                {ord.items.map((item) => {
                  return (
                    <div className="info">
                      <span><b>{item.qty}</b>{" "}X </span>
                      <b>{item.product.name}</b>
                    </div>
                  );
                })}
              </div>
              <span>Total Amount : <b>{calculateTotal(ord.items)}</b></span>
              <span><Avatar img={ord.user.avatar}/>{ord.user.username}</span>
              <span className="status">{getStatusOfOrder(ord)}</span>
            </div>
          )))}
        </div>
      </div>:
      <div className="recents">
        <h2 className="serif" style={{ margin: "2em 0" }}>
          Recent Products
        </h2>
        <div className="orders flex scroll-x">
          {isLoading && <Loader />}

          { !isLoading && (!products?.length ? <>No Products</> : products?.map((product, index) => (
            <ProductCard {...product} />
          )))}
        </div>
      </div>}
    </div>
  );
}
