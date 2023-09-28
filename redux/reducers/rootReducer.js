import { combineReducers } from "redux";
import postReducer from './postReducer'
import codeReducer from './codeReducer'
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import searchReducer from "./searchReducer";
import cart from './cartReducer'
import categoryReducer from "./categoryReducer";
import bookReducer from "./bookReducer";
const rootReducer = combineReducers({
    postReducer: postReducer,
    codeReducer,
    userReducer,
    alertReducer,
    searchReducer,
    cart,
    categoryReducer,
    bookReducer
})

export default rootReducer