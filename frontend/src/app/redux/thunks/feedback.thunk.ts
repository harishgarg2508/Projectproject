import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";



interface Feedbackfilters {

    search?: string;
    page?: number;
}

export const getFeedback = createAsyncThunk(
    'getFeedback',
    async (filters: Feedbackfilters = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();

            if (filters.search) params.append('search', filters.search);
            if (filters.page) params.append('page', filters.page.toString());

            const response = await axiosInstance.get(`/feedbacks?${params.toString()}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to get feedback');
        }
    }
);