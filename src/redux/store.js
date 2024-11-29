import { configureStore } from "@reduxjs/toolkit";
import membersReducer from './membersSlice'
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        members: membersReducer,
        user: userReducer,
    }
})