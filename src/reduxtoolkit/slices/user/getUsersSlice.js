import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"
const initialState = {
    loading: false,
    error: null,
    data:[],
};

export const getUser = createAsyncThunk(
    'getUser',
    async () => {
        try {
            const response = await axios.get (`http://localhost:3004/users`);
            const data = response?.data;
            return data;
        } catch (err) {
            console.log(err)
        }
    },
);

const getUsersSlice = createSlice({
    name: 'getUser',
    initialState,
    extraReducers: {
        [getUser.pending]: (state) => {
            state.loading = true;
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.error = null;
        },
        [getUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.data = null;
            state.error = payload
        },
    },
});

export const getUserSelector = (state) => state.getUser;
export const getUserReducer = getUsersSlice.reducer;
