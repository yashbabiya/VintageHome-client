export const getStatusOfOrder = (order) =>{
    if(order?.orderPlacedDate){
        return "COMPLETED"
    }
    if(order?.orderDepartedDate){
        return "DEPARTED"
    }
    if(order?.orderConfirmDate){
        return "CONFIRM"
    }
    if(order?.paymentDate){
        return "PAYMENT_DONE"
    }
    
}
