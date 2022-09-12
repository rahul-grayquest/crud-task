import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    loading: false,
    error: null,
    data:[],
};

export const deleteUser = createAsyncThunk(
    'deleteUser',
    async ({id},{ rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:3004/users/${id}`);
            const data =  response?.data
            return data;
        } catch (err) {
            const errObj = {
                type: 'DELETE_USER_FAILURE',
                error: err,
                message: 'Oops! something went wrong',
            };
            return rejectWithValue(err?.response?.data || errObj);
        }
    },
);

const  deleteUserSlice = createSlice({
    name: 'deleteUser',
    initialState,
    extraReducers:{
        [deleteUser.pending]: (state) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.error = null;
        },
        [deleteUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.data = null;
            state.error = payload;
        },
    },
});

export const deleteUserSelector = (state) => state.deleteUser;
export const deleteUserReducer = deleteUserSlice.reducer;
