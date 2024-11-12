import { createSlice } from "@reduxjs/toolkit";

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [],
        loading: false,
        currentBooking: {}
    },
    reducers: {
        addBooking: (state, action) => {
            state.bookings.push(action.payload);
        }
    }
})

export const { addBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;