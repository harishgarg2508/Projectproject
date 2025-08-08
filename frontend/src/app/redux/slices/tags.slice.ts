import { createSlice } from "@reduxjs/toolkit";
import { getTags } from "../thunks/tags.thunk";

interface Tag {
  id: number;
  name: string;
}

interface Data {
  tags: Tag[];
  isLoading: boolean;
  error: string;
}

const initialState: Data = {
  tags: [],
  isLoading: false,
  error: "",
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTags.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });

    builder.addCase(getTags.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tags = action.payload || [];   
    });

    builder.addCase(getTags.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default tagsSlice.reducer;
