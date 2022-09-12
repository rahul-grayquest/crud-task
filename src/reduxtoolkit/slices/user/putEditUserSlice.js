import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    loading: false,
    error: null,
    data: [],
};

export const putEditUser = createAsyncThunk(
    'putEditUser',
    async ( id, body, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3004/users/${id}`,body);
            console.log(response)
            const data = response?.data;
            return data;
        } catch (err) {
            const errObj = {
                type: 'PUT_EDIT_USER_FAILURE',
                error: err,
                message: 'Oops! something went wrong',
            };
            return rejectWithValue(err?.response?.data || errObj);
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
