import { Edit, UploadFile, Verified } from "@mui/icons-material";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import EditableText from "../components/EditableText";
import EditableTextMulti from "../components/EditableTextMulti";
import { URL } from "../helpers/API";
import { showEditButton } from "../helpers/showEditButton";
import { uploadFile } from "../helpers/uploadFile";

export default function CreateProduct() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [doc, setDoc] = useState();

  const defaultProduct = {
    imgs: "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png",
    name: "Add a Name",
    price: 0,
    description: "Describe Your Product to users",
    category: "",
    type: "artwork",
    doc: "",
  };
  const [product, setProduct] = useState(defaultProduct);

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
    if (product.type === "collectables" && !doc) {
      setError(
        "Please upload a documnet as a proof of verified collectible item"
      );
      return false;
    }
    return true;
  };

  const createProduct = async () => {
    let imgUrl = product.imgs;
    let documents = "";
    if (file) {
      imgUrl = await uploadFile(file).catch((err) =>
        alert("error while uploading doc")
      );
    }
    if (doc) {
      documents = await uploadFile(doc).catch((err) =>
        alert("error while uploading doc")
      );
    }
    if (isAllDataSet()) {
      console.log("here after");
      axios
        .post(
          URL + "product/create",
          { ...product, imgs: imgUrl, doc: documents },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("Product Added");
          navigate("/myProducts");
        })
        .catch((err) => {
          toast.error("Error Occured");
        });
    }
  };
  const canEdit = true;
  return (
    <div className="product-page">
      {error && <span style={{ padding: "1em", color: "red" }}>*{error}</span>}
      <div className="top flex">
        <div className="left imgHolder">
          {file && <img src={product.imgs} alt=""/> }
          {!file && <label for="image" className="box"> <UploadFile /> Upload Your Product Image Here</label>}
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
        </div>
        <div className="right">
          <EditableText
            value={product.name}
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value });
            }}
            sx={"serif h1"}
          />
          <span>
            $
            <EditableText
              value={`${product.price}`}
              onChange={(e) => {
                setProduct({ ...product, price: e.target.value });
              }}
              sx={""}
            />
          </span>
          <div className="sellerinfo">
            <img src={user.avatar} alt="" />
            <b>{user.username}</b>
          </div>
          <div className="categories">

          <Select
            value={product.type}
            onChange={(e) => {
              setProduct({ ...product, type: e.target.value });
            }}
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
            displayEmpty
            defaultValue={allCategories[0]?.value}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ minWidth: 150 }}
          >
            {allCategories.map((cat) => (
              <MenuItem value={cat.value}>{cat.label}</MenuItem>
            ))}
          </Select>
          </div>

          {product.type === "collectables" && (
            <>
            <label for="doc">
              {doc ? <>Doc Attached</> : <div className="outline-btn">Upload A Document to verify</div>}
            </label>
            <input
              type="file" 
              id="doc"
              style={{display:"none"}}
              onChange={(e) => {
                setDoc(e.target?.files[0]);
              }}
              />
            </>
          )}
        <button onClick={() => createProduct()}>Create a Product</button>

        </div>
      </div>
      <div className="about">
        <h1 className="serif">About</h1>
        <EditableTextMulti
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
