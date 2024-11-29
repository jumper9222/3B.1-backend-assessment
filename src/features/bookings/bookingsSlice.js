import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://coworking-database-api.vercel.app";

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

export const fetchBookingById = createAsyncThunk(
    "bookings/fetchBookingById",
    async (data) => {
        const response = await axios.get(`${BASE_URL}/booking/${data.userId}/${data.bookingId}`)
        console.log(response.data);
        return response.data;
    }
)

export const updateBooking = createAsyncThunk(
    "bookings/updateBooking",
    async (bookingDetails) => {
        const response = await axios.put(`${BASE_URL}/booking/${bookingDetails.id}`, bookingDetails);
        console.log(response.data);
        return response.data;
    }
)

export const deleteBooking = createAsyncThunk(
    "bookings/deleteBooking",
    async (data) => {
        const response = await axios.delete(`${BASE_URL}/booking/${data.bookingId}`, { data: { userId: data.userId } });
        console.log(response.data);
        return response.data;
    }
)

const bookingsSlice = createSlice({
    name: "bookings",
    initialState: {
        bookings: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createBooking.pending, (state) => {
            state.loading = true;
            console.log(`Loading: ${state.loading}`)
        });
        builder.addCase(createBooking.fulfilled, (state, action) => {
            state.currentBooking = [...state.bookings, action.payload]
            state.loading = false;
            console.log(`Loading: ${state.loading}`)
        });
        builder.addCase(fetchBookingsByUser.pending, (state) => {
            state.loading = true;
            console.log(`Loading: ${state.loading}`);
        });
        builder.addCase(fetchBookingsByUser.fulfilled, (state, action) => {
            state.bookings = action.payload;
            state.loading = false;
            console.log(`Loading: ${state.loading}`)
        });
        builder.addCase(fetchBookingById.pending, (state) => {
            state.loading = true;
            console.log(`Loading: ${state.loading}`)
        });
        builder.addCase(fetchBookingById.fulfilled, (state) => {
            state.loading = false;
            console.log(`Loading: ${state.loading}`)
        });
        builder.addCase(updateBooking.pending, (state) => {
            state.loading = true;
            console.log(`Loading: ${state.loading}`);
        });
        builder.addCase(updateBooking.fulfilled, (state, action) => {
            state.bookings = state.bookings.map((booking) => {
                if (booking.id === action.payload.id) {
                    return action.payload
                } else return action.payload;
            });
            state.loading = false;
            console.log(`Loading: ${state.loading}`)
        });
        builder.addCase(deleteBooking.pending, (state) => {
            state.loading = true;
            console.log(`Loading: ${state.loading}`);
        });
        builder.addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookings = state.bookings.filter(booking => {
                booking.id !== action.payload.id
            });
            state.loading = false;
            console.log(`Loading: ${state.loading}`)
        });
    }
})

export default bookingsSlice.reducer;