const initialState = JSON.parse(localStorage.getItem("cart"))


const cartReducer = (state=initialState,action) =>{
    switch(action.type){
        case "ADD_TO_CART":
            state = action.payload
            localStorage.setItem("cart",JSON.stringify(state))
            return state;

        case "UPDATE_CART_ITEM":
            state = action.payload
            localStorage.setItem("cart",JSON.stringify(state))
            return state;

        default:
            return state;
    }
}

export default cartReducer;