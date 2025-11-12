import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { nanoid } from "nanoid";
import { sub } from "date-fns";

interface Reactions {
  thumsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}
export interface PostData {
  id: string;
  title: string;
  content: string;
  userId?: string;
  date: string;
  reactions: Reactions;
}

const initialState: PostData[] = [
  {
    id: nanoid(),
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: nanoid(),
    title: "Slices...",
    content: "the more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
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
            reactions: {
              thumsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    // The issue is that reactionAdded is expecting a different payload type. It needs id and reaction, not the full PostData. Here's the corrected code:
    reactionAdded: (
      state,
      action: PayloadAction<{ postId: string; reaction: keyof Reactions }>
    ) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state: RootState) => state.posts;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
