import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../store";

interface User {
  id: string;
  name: string;
}

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return [...response.data];
  }
);

const initialState: User[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllusers = (state: RootState) => state.users;
export default usersSlice.reducer;
