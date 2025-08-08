import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";



interface Feedbackfilters {

    search?: string;
    page?: number;
    tagIds?: string;
    authorIds?: string
}

export const getFeedback = createAsyncThunk(
    'getFeedback',
    async (filters: Feedbackfilters = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();

            if (filters.search) params.append('search', filters.search);
            if (filters.page) params.append('page', filters.page.toString());
            if (filters.tagIds) params.append('tagIds', filters.tagIds);
            if (filters.authorIds) params.append('authorIds', filters.authorIds);

            const response = await axiosInstance.get(`/feedbacks?${params.toString()}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to get feedback');
        }
    }
);