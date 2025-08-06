import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";


export const upvoteDownvote = createAsyncThunk(
    'voteFeedback',
    async (data: any, { rejectWithValue }) => {
        try {
            console.log(data);
            const response = await axiosInstance.post('/votes', data);
            return response.data;
        } catch (error: any) {
            console.log(error.response?.data);
            return rejectWithValue(error.response?.data || 'Vote creation failed');
        }
    }
);