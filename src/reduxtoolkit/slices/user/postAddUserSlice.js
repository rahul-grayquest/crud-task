import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

const initialState = {
    loading: false,
    error: null,
    data: [],
};

export const postAddUser = createAsyncThunk(
    'postAddUser',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3004/users",body);
            const data = response;
            console.log(data)
            return data;
        } catch (err) {
            const errObj = {
                type: 'POST_ADD_USER_FAILURE',
                error: err,
                message: 'Oops! something went wrong',
            };
            return rejectWithValue(err?.response?.data || errObj);
        }
    },
);

const postAddUserSlice = createSlice({
    name: 'postAddUser',
    initialState,
    extraReducers: {
        [postAddUser.pending]: (state) => {
            state.loading = true;
        },
        [postAddUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.data = payload;
            state.error = null;
        },
        [postAddUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.data = null;
            state.error = payload;
        },
    },
});

export const postAddUserSelector = (state) => state.postAddUser;
export const postAddUserReducer = postAddUserSlice.reducer;
