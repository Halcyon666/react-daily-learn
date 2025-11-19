import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { nanoid } from "nanoid";
import type { RootState } from "../../store";

export interface Reactions {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
}
export interface PostData {
  // just for the key prop in loop, but the type is number in api result
  id: string;
  title: string;
  body: string;
  userId?: string;
  date?: string;
  reactions: Reactions;
}

interface PostDataDto {
  posts: PostData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
export const fetchPosts = createAsyncThunk<PostData[]>(
  "post/fetchPosts",
  async () => {
    const response = await axios.get(POSTS_URL);
    return [...response.data];
  }
);

export const addNewPost = createAsyncThunk(
  "post/addNewPost",
  async (initialPost: { title: string; body: string; userId: string }) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: PostData) => {
    const { id } = initialPost;
    const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
    return response.data;
  }
);

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
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
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
        // state.posts = state.posts.concat(loadedPosts);
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // NOTE API userId is number   userId: 1
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete, thus of id not exists!");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const oldPosts = state.posts.filter((post) => post.id !== id);
        state.posts = [...oldPosts, action.payload];
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostError = (state: RootState) => state.posts.error;

export const selectPostById = (state: RootState, postId: number | undefined) =>
  state.posts.posts.find((post) => Number(post.id) === postId);
export const { postAdded, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;
