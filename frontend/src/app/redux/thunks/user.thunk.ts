import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";

export const getUsers = createAsyncThunk(
  'getUsers',
  async (search: string | undefined, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);

      const response = await axiosInstance.get(`/user?${params.toString()}`);
      console.log(response.data);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to get tags');
    }
  }
);
