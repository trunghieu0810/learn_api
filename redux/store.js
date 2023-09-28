import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from "./reducers/rootReducer";



const initiaState = {}
const middleware = [thunk];

const store = createStore(rootReducer, initiaState, composeWithDevTools(applyMiddleware(...middleware)))

export default store