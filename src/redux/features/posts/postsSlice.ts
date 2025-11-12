import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { nanoid } from "nanoid";
import { sub } from "date-fns";

export interface PostData {
  id: string;
  title: string;
  content: string;
  userId?: string;
  date: string;
}

const initialState: PostData[] = [
  {
    id: nanoid(),
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: nanoid(),
    title: "Slices...",
    content: "the more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

const postsSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostData>) => {
        state.push(action.payload);
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
