import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const getTags = createAsyncThunk(
  'getTags',
  async (search: string | undefined, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);

      const response = await axiosInstance.get(`/tags?${params.toString()}`);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to get tags');
    }
  }
);
