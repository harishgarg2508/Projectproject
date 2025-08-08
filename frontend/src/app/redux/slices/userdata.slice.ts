import { createSlice } from "@reduxjs/toolkit";
import { getTags } from "../thunks/tags.thunk";
import { getUsers } from "../thunks/user.thunk";

interface User {

    id: number
    username: string

}

interface UserData {
    users: User[];
    isLoading: boolean;
    error: string;
}

const initialState: UserData = {
    users: [],
    isLoading: false,
    error: "",
};

export const userDataSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        });

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload || [];
        });

        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export default userDataSlice.reducer;
