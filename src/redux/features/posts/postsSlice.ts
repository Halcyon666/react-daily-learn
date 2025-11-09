import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface PostData {
  id: string;
  title: string;
  content: string;
}

const initialState: PostData[] = [
  {
    id: "1",
    title: "Learning Redux Toolkid",
    content: "I've heard good things.",
  },
  {
    id: "2",
    title: "Slices...",
    content: "the more Isay slice, the more I want pizza.",
  },
];

const postsSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
});

export const selectAllPosts = (state: RootState) => state.posts;
export default postsSlice.reducer;
