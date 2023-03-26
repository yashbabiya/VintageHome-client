export const showEditButton =(seller)=>{
   const user = JSON.parse(localStorage.getItem("user"));
   
   return seller === user._id
}