const initialState = {
    keyword:"",
    category:[],
    type:""
}

const searchReducer = (state=initialState,action) =>{
    switch(action.type){
        case "UPDATE":
            state = {...state,...action.payload}
            return state;

        default:
            return state;
    }
}

export default searchReducer;