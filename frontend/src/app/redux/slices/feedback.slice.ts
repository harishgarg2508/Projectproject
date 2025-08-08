import { createSlice } from "@reduxjs/toolkit";
import { getFeedback } from "../thunks/feedback.thunk";






export interface FeedbackInterface{
    id: number,
    title: string,
    description: string,
    status: string,
    score:number,
    tags:[{
        tag:{id: number,
        name: string}
    }],
    user: {
        id: number,
        username: string,
    },
    created_at: string
   
}

interface FeedbackState {
  feedbacks: FeedbackInterface[];
  isLoading: boolean;
  error: string;
  totalCount: number
}



const initialState: FeedbackState = {
  feedbacks: [],
  isLoading: false,
  error: "",
  totalCount: 0
};

const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFeedback.pending, (state) => {
            return state;
        });
        builder.addCase(getFeedback.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(getFeedback.rejected, (state) => {
            return state;
        });
    },
});

export default feedbackSlice.reducer;