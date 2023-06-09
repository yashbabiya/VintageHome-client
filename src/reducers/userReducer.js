const initialState = {
    isUserLoggedIn:!!localStorage.getItem("user"),
    ...JSON.parse(localStorage.getItem("user"))
}

const userReducer = (state=initialState,action) =>{
    switch(action.type){
        case "LOGIN":
            state = {...state,...action.payload,isUserLoggedIn:true}
            localStorage.setItem("user",JSON.stringify(state))
            action?.payload?.cart?.items && localStorage.setItem("cart",JSON.stringify(action.payload?.cart?.items))
            return state;

        case "UPDATEUSER":
            state = {...state,...action.payload}
            localStorage.setItem("user",JSON.stringify(state))
            return state;

        case "LOGOUT":
            localStorage.removeItem("user")
            localStorage.removeItem("cart")
            state=initialState;
            return state;


        default:
            return state;
    }
}

export default userReducer;