import { Check, DeleteForever, Edit, Verified } from "@mui/icons-material";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import EditableText from "../components/EditableText";
import EditableTextMulti from "../components/EditableTextMulti";
import SellerCard from "../components/sellerCard";
import { URL } from "../helpers/API";
import { showEditButton } from "../helpers/showEditButton";
import { uploadFile } from "../helpers/uploadFile";

export default function Product() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const { state } = useLocation();
  const { product: prdX } = state;

  const defaultProduct = prdX;
  const [error, setError] = useState("");
  const [product, setProduct] = useState(defaultProduct);
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const canEdit =
    user.role === "SELLER" && showEditButton(product?.seller?._id);

  const allCategories =
    product.type === "collectables"
      ? [
          { label: "Comics", value: "comics" },
          { label: "History", value: "history" },
          { label: "Sports", value: "sports" },
          { label: "Autographs", value: "autographs" },
          { label: "Coins", value: "coins" },
        ]
      : [
          { label: "Paintings", value: "paintings" },
          { label: "Sculptures", value: "sculptures" },
          { label: "Clocks", value: "clocks" },
          { label: "Furniture", value: "furniture" },
        ];

  const isUserAdmin = user.role === "ADMIN";

  useEffect(() => {
    setProduct({ ...product, category: allCategories[0]?.value });
  }, [product.type]);

  const isAllDataSet = () => {
    if (!product.name) {
      setError("Please Enter a Name of Product");
      return false;
    }
    if (!product.price) {
      setError("Please Enter a Price of Product");
      return false;
    }
    if (!product.description) {
      setError("Please Enter a Proper description of Product");
      return false;
    }
    if (product.type === "collectables" && !product.doc) {
      setError(
        "Please upload a documnet as a proof of verified collectible item"
      );
      return false;
    }
    return true;
  };

  const updateProduct = async () => {
    let imgUrl = product.imgs;
    if (file) {
      imgUrl = await uploadFile(file);
    }
    if (!_.isEqual(defaultProduct, product) && isAllDataSet()) {
      axios
        .put(
          URL + "product/edit",
          { ...product, imgs: imgUrl },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("Product details updated");
        })
        .catch((err) => {
          toast.error("Product details updated");
        });
    }
  };
  const deleteProduct = () => {
    if (window.confirm("Are You sure ?")) {
      axios
        .delete(URL + `product/delete?prodId=${product._id}`, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          // alert("Could not delete product");
        });
    }
  };
  const verifyProduct = () => {
    if (window.confirm("Are You sure ?")) {
      axios
        .put(
          URL + "admin/approveProduct",
          { prodId: product._id },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("verified");
        });
    }
  };

  return (
    <div className="product-page">
      {error && <span>{error}</span>}
      <div className="top flex">
        <div className="left imgHolder box">
          <img src={product.imgs} alt="" />
          {canEdit &&<label for="image" className="editImageButton"><Edit /></label>}
          {canEdit && (
            <input
              type="file"
              id="image"
              style={{display:"none"}}
              onChange={(e) => {
                var reader = new FileReader();
                var url = reader.readAsDataURL(e.target?.files[0]);
                setFile(e.target?.files[0]);
                reader.onloadend = function (e) {
                  setProduct({ ...product, imgs: reader.result });
                }.bind(this);
              }}
            />
          )}
        </div>
        <div className="right">
          {canEdit && <DeleteForever onClick={() => deleteProduct()} />}

          <EditableText
            disabled={!canEdit}
            value={product.name}
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value });
            }}
            sx={"serif h1"}
          />
          <span>
            $
            <EditableText
              disabled={!canEdit}
              value={`${product.price}`}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
              sx={""}
            />
          </span>
          <span>
            {product?.isApproved && (
              <>
                <Verified /> Admin Approved
              </>
            )}
          </span>
          <div className="categories">
            <Select
              value={product.type}
              onChange={(e) => {
                setProduct({ ...product, type: e.target.value });
              }}
              className="typeOfProduct"
              disabled={true}
              displayEmpty
              defaultValue={"artwork"}
              inputProps={{ "aria-label": "Without label" }}
              sx={{ minWidth: 150 }}
            >
              {[
                { label: "Artwork", value: "artwork" },
                { label: "Collectables", value: "collectables" },
              ].map((cat) => (
                <MenuItem value={cat.value}>{cat.label}</MenuItem>
              ))}
            </Select>
            <Select
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
              className="typeOfProduct"
              displayEmpty
              disabled={!canEdit}
              defaultValue={allCategories[0]?.value}
              inputProps={{ "aria-label": "Without label" }}
              sx={{ minWidth: 150 }}
            >
              {allCategories.map((cat) => (
                <MenuItem value={cat.value}>{cat.label}</MenuItem>
              ))}
            </Select>
          </div>

          {isUserAdmin &&
            !product?.isApproved &&
            product.type === "collectables" && (
              <button className="outline-btn" onClick={verifyProduct}>
                Verify Product
              </button>
            )}
          {isUserAdmin && product.doc && (
            <a href={product.doc} target="_blanck" className="outline-btn">
              Document
            </a>
          )}
          {user.role === "BUYER" && <AddToCartButton product={product} />}
          <div className="sellerinfo">
            {(product?.isBanned || product.seller.isBanned) && (
              <span className="warning-status">Banned</span>
              )}
            <img src={product?.avatar || product.seller.avatar} alt="" />
            <b>{product?.username || product.seller.username}</b>
          </div>
              {canEdit && (
                <button onClick={() => updateProduct()}>Edit Product</button>
              )}
        </div>
      </div>
      <div className="about">
        <h1 className="serif">About{canEdit && <Edit />}</h1>
        <EditableTextMulti
          disabled={!canEdit}
          value={product.description}
          onChange={(e) => {
            setProduct({ ...product, description: e.target.value });
          }}
          sx={"white-color"}
        />
      </div>
    </div>
  );
}
