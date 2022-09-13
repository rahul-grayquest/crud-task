import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    loading: false,
    error: null,
    data:[],
};

export const putEditUser = createAsyncThunk(
    'putEditUser',
    async (body) => {
        try {
            console.log("body:",body)
            const response = await axios.put(`http://localhost:3004/users/${body.id}`,body);
            console.log("res:",response)
            const data = response?.data;
            return data;
        } catch (err) {
            console.log(err)
        }
    },
);

const putEditUserSlice = createSlice({
    name: 'putEditUser',
    initialState,
    extraReducers: {
        [putEditUser.pending]: (state) => {
            state.loading = true;
        },
        [putEditUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.error = null;
        },
        [putEditUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.data = null;
            state.error = payload;
        },
    },
});

export const putEditUserSelector = (state) => state.putEditUser;
export const putEditUserReducer = putEditUserSlice.reducer;
