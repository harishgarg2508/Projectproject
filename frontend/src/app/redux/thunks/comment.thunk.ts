import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";



export const createComment = createAsyncThunk(
    'createComment',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/comments', data);
            return response.data;
        } catch (error: any) {
            console.log(error.response?.data);
            return rejectWithValue(error.response?.data || 'Comment creation failed');
        }
    }
);