import {combineReducers,configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth";
import currentUserReducer from "./user";
import roomReducer from "./room";
import adminReducer from "./admin"

const reducer={
auth:authReducer,
currentUser:currentUserReducer,
room: roomReducer,
admin:adminReducer
}
const rootReducer=combineReducers(reducer)
const preloadedState = {};

const resettableReducer=(state,action)=>{

    // if(action.type==="auth/log_out/fulfilled"){
    //     return rootReducer(undefined,action)
    // }
    // else{
        return rootReducer(state,action);
    // }
}


export const store=configureStore({
    reducer:resettableReducer,
    preloadedState
})

