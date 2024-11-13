import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const createBooking = createAsyncThunk(
    "bookings/createBooking",
    async (bookingDetails) => {
        const response = await axios.post(`${BASE_URL}/booking`, bookingDetails);
        console.log(response.data);
        return response.data;
    }
)

export const fetchBookingsByUser = createAsyncThunk(
    "bookings/fetchBookingsByUser",
    async (userId) => {
        const response = await axios.get(`${BASE_URL}/booking/${userId}`);
        console.log(response.data);
        return response.data;
    })

export const updateBooking = createAsyncThunk(
    "bookings/updateBooking",
    async (bookingDetails) => {
        const response = await axios.put(`${BASE_URL}/booking/${bookingDetails.id}`, bookingDetails);
        console.log(response.data);
        return response.data;
    }
)

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [],
        loading: false,
        currentBooking: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createBooking.pending, (state) => {
            state.loading = true;
            console.log(state.loading)
        });
        builder.addCase(createBooking.fulfilled, (state, action) => {
            state.currentBooking = [...state.bookings, action.payload]
            state.loading = false;
            console.log(state.currentBooking, state.loading)
        });
        builder.addCase(fetchBookingsByUser.pending, (state) => {
            state.loading = true;
            console.log(state.loading);
        })
        builder.addCase(fetchBookingsByUser.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
            console.log(state.bookings, state.loading)
        });
        builder.addCase(updateBooking.pending, (state) => {
            state.loading = true;
            console.log(state.loading);
        })
        builder.addCase(updateBooking.fulfilled, (state, action) => {
            state.currentBooking = action.payload;
            state.loading = false;
            console.log(state.currentBooking, state.loading)
        });
    }
})

export default bookingsSlice.reducer;