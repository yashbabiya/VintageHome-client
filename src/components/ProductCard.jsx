import { useSelect } from "@mui/base";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard(props) {
  const user = useSelector((state) => state.user);
  console.log("user", user);
  return (
    <div className="product-card" key={props.key}>
      <Link to={`/product/${props._id}`} state={{ product: props }}>
        <img src={props.imgs} alt="" />
        <div>
          <h2 className="serif">{props.name}</h2>
          <p>$ {props.price}</p>
          <p className="tag"> {props.category}</p>
        </div>
      </Link>
      {user.role === "BUYER" && <AddToCartButton product={props} />}
    </div>
  );
}
