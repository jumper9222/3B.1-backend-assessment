import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../../firebase";

const { VITE_GOOGLE_CLIENT_ID } = import.meta.env;
const BASE_URL = "https://coworking-database-api.vercel.app";

export const connectToGoogleCalendar = createAsyncThunk(
    "userAuth/connectToGoogleCalendar",
    async () => {
        const userId = auth.currentUser.uid
        const client = await google.accounts.oauth2.initCodeClient({
            client_id: VITE_GOOGLE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/calendar',
            access_type: 'offline',
            ux_mode: 'popup',
            callback: async (response) => {
                try {
                    const res = await axios.post(`${BASE_URL}/exchange-code`, { code: response.code, userId })
                    console.log('Tokens exchanged successfully', res.data)
                }
                catch (error) {
                    console.error(`Error sending code to backend`, error)
                }
            }
        });
        client.requestCode();
    })

export const addEventToGoogleCalendar = createAsyncThunk(
    "userAuth/addEventToGoogleCalendar",
    async (event) => {
        const userId = auth.currentUser.uid
        try {
            const response = await axios.post(`${BASE_URL}/add-to-calendar`, { event, userId });
            console.log('Calendar event added successfully', response)
        } catch (error) {
            console.error('An error occured trying to add event to calendar', error)
        }
    }
)

export const checkConnectionStatus = createAsyncThunk(
    "userAuth/checkConnectionStatus",
    async () => {
        const userId = auth.currentUser.uid
        try {
            const response = await axios.get(`${BASE_URL}/check-connection-status`, { params: { userId } })
            return response.data.connectionStatus
        } catch (error) {
            console.error('Error fetching connection status', error)
        }
    }
)

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: {
        connectedToGoogleCalendar: false,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(connectToGoogleCalendar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(connectToGoogleCalendar.fulfilled, (state) => {
            state.loading = false;
            state.connectedToGoogleCalendar = true;
        });
        builder.addCase(connectToGoogleCalendar.rejected, (state) => {
            state.loading = false;
            console.log('Access code exchange failed.')
        });
        builder.addCase(addEventToGoogleCalendar.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addEventToGoogleCalendar.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(checkConnectionStatus.pending, (state) => {
            state.loading = true
        });
        builder.addCase(checkConnectionStatus.fulfilled, (state, action) => {
            state.loading = false
            state.connectedToGoogleCalendar = action.payload;
        });
        builder.addCase(checkConnectionStatus.rejected, (state) => {
            state.loading = false;
            console.log('Connection staus request failed.')
        });
    }
})

export default userAuthSlice.reducer;
