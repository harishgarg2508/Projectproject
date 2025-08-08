import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/app/utils";




export const createFeedback =  createAsyncThunk(
  'addfeedback',
  async (data:any, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.post('/feedbacks',data);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to get tags');
    }
  }
);
