import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import type { RootState } from "../../store";
import axios from "axios";
import { sub } from "date-fns";

export interface Reactions {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}
export interface PostData {
  id: string;
  title: string;
  body: string;
  userId?: string;
  date: string;
  reactions: Reactions;
}

interface PostDataDto {
  posts: PostData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return [...response.data];
});

const initialState: PostDataDto = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostData>) => {
        state.posts.push(action.payload);
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
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
      // fix error
      action: PayloadAction<{ postId: string; reaction: keyof Reactions }>
    ) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostError = (state: RootState) => state.posts.error;
export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
