import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface PostData {
  id: string;
  title: string;
  content: string;
}

const initialState: PostData[] = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
  },
  {
    id: "2",
    title: "Slices...",
    content: "the more I say slice, the more I want pizza.",
  },
];

const postsSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    postAdded: (state, action: PayloadAction<PostData>) => {
      state.push(action.payload);
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
