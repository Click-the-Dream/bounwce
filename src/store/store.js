import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./authSlice"


const store = configureStore({
    reducer: {
        account: accountReducer,
    }, 
})

export default store