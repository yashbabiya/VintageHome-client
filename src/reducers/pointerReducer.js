const initialState = {
    className:"pointer"
}

const pointerReducer = (state=initialState,action) =>{
    switch(action.type){
        case "MAKE_BIG":
            state = {...state,className:"pointer-big"}
            return state;

        case "MAKE_NORMAL":
            state = {...state,className:"pointer"}
            return state;

        default:
            return state;
    }
}

export default pointerReducer;