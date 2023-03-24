import { combineReducers } from "redux";
import cartReducer from "./cart";
import pointerReducer from "./pointerReducer";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    search:searchReducer,
    user:userReducer,
    pointer:pointerReducer,
    cart:cartReducer
})

export default rootReducer