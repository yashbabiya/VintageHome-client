import {
  Cancel,
  CheckCircle,
  Done,
  Pending,
  RemoveCircle,
} from "@mui/icons-material";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { URL } from "../helpers/API";
import { getDateInFormat } from "../helpers/getDateInFormat";
import { showEditButton } from "../helpers/showEditButton";
export default function OrderProgressBar({ order }) {
  const user = useSelector(state=>state.user)
  const changeStatus = (status,reject) =>{
    axios.put(URL+'product/changeOrderStatus',{status:status,reject:reject,deal:order._id},{withCredentials:true}).then((res)=>{
      toast.success("You have updated the status")
    }).catch(()=>{
      toast.error("Error while updating the status")
    })
  }
  const canEdit = showEditButton(order?.seller?._id || order.seller)
  return (
    <div className="progress">
      <div className={`checkpoint ${order?.paymentDate ? "done" : "pending"}`}>
        {order?.paymentDate ? (
          <CheckCircle sx={{ fontSize: 60, color: "green" }} />
        ) : (
          <Pending sx={{ fontSize: 60, color: "" }} />
        )}
        <b>Payment Done</b>
        <span>{getDateInFormat(order?.paymentDate)}</span>
        {canEdit && !(order?.paymentDate || order?.rejectDate) && <div className="action">
          <CheckCircle sx={{ color: "green" }} /> or{" "}
          <Cancel sx={{ color: "red" }} />
        </div>}
      </div>
      <div className={`progressbar ${order?.paymentDate && "done-bg"}`}></div>
      <div
        className={`checkpoint ${order?.orderConfirmDate ? "done" : (order?.rejectDate ? "cancel" : "pending")}`}
      >
        {order?.orderConfirmDate ? (
          <CheckCircle sx={{ fontSize: 60, color: "green" }} />
        ) : (
          order?.rejectDate? <Cancel sx={{ fontSize: 60, color: "red" }} /> :
          <Pending sx={{ fontSize: 60 }} />
        )}
        <b>Order Confirm</b>
        <span>{getDateInFormat(order?.orderConfirmDate || order?.rejectDate)}</span>
        {canEdit && !(order?.orderConfirmDate || order?.rejectDate) && <div className="action">
          <CheckCircle onClick={()=>changeStatus("CONFIRM_ORDER")} sx={{ color: "green" }} /> or{" "}
          <Cancel onClick={()=>changeStatus("",true)} sx={{ color: "red" }} />
        </div>}
      </div>
      <div
        className={`progressbar ${order?.orderConfirmDate && "done-bg"}`}
      ></div>
      <div
        className={`checkpoint ${
          order?.orderDepartedDate ? "done" : (order?.rejectDate ? "cancel" : "pending")
        }`}
      >
        {order?.orderDepartedDate ? (
          <CheckCircle sx={{ fontSize: 60, color: "green" }} />
        ) : (
          order?.rejectDate? <Cancel sx={{ fontSize: 60, color: "red" }} /> :
          <Pending sx={{ fontSize: 60 }} />
        )}
        <b>Order Shipped</b>
        <span>{getDateInFormat(order?.orderDepartedDate || order?.rejectDate)}</span>
        {canEdit && !(order?.orderDepartedDate || order?.rejectDate) && <div className="action">
          <CheckCircle onClick={()=>changeStatus("ORDER_SHIPPED")} sx={{ color: "green" }} /> or{" "}
          <Cancel onClick={()=>changeStatus("",true)} sx={{ color: "red" }} />
        </div>}
      </div>
      <div
        className={`progressbar ${order?.orderDepartedDate && "done-bg"}`}
      ></div>
      <div
        className={`checkpoint ${order?.orderPlacedDate ? "done" : (order?.rejectDate ? "cancel" : "pending")}`}
      >
        {order?.orderPlacedDate ? (
          <CheckCircle sx={{ fontSize: 60, color: "green" }} />
        ) : (
          order?.rejectDate? <Cancel sx={{ fontSize: 60, color: "red" }} /> :
          <Pending sx={{ fontSize: 60 }} />
        )}
        <b>Order Deliverd</b>
        <span>{getDateInFormat(order?.orderPlacedDate || order?.rejectDate)}</span>
        {canEdit && !(order?.orderPlacedDate || order?.rejectDate) && <div className="action">
          <CheckCircle onClick={()=>changeStatus("ORDER_PLACED")} sx={{ color: "green" }} /> or{" "}
          <Cancel onClick={()=>changeStatus("",true)} sx={{ color: "red" }} />
        </div>}
      </div>
    </div>
  );
}
