import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer from "./features/bookings/bookingsSlice";
import userAuthReducer from "./features/userAuth/userAuthSlice";

export default configureStore({
    reducer: {
        bookings: bookingsReducer,
        userAuth: userAuthReducer,
    }
})