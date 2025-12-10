import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../store.ts.bak";

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
    builder.addCase(fetchUsers.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const selectAllusers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId: number) =>
  state.users.find((user) => Number(user.id) === userId);
export default usersSlice.reducer;
