import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import sessionReducer from "./SessionReducer"
import currentUserReducer from "./CurrentUserReducer";

const rootReducer = combineReducers({
    authReducer,
    sessionReducer,
    currentUserReducer
})

export default rootReducer