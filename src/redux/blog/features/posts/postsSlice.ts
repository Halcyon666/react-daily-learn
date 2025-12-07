import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
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
  date: string;
  reactions: Reactions;
}

/* interface PostDataDto {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  count: number;
} */

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
  async (initialPost: {
    id: string;
    title: string;
    body: string;
    userId: string;
    reactions: Reactions;
  }) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      console.log("update failed", err);
      // only for testing Redux!
      return initialPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (initialPost: { id: string }) => {
    const { id } = initialPost;
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    throw new Error(`${response?.status}: ${response?.statusText}`);
  }
);

const postsAdapter = createEntityAdapter<PostData>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// initialState 不要加类型，让 TypeScript 自己推导
const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null as string | null | undefined,
  count: 0,
});

const postsSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostData>) => {
        postsAdapter.addOne(state, action.payload);
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
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount: (state) => {
      state.count = state.count + 1;
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
        postsAdapter.upsertMany(state, loadedPosts);
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
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        action.payload.date = new Date().toISOString();
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});

export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostError = (state: RootState) => state.posts.error;
export const getCount = (state: RootState) => state.posts.count;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts);
export const selectPostByUser = createSelector(
  [selectAllPosts, (_, userId) => userId],
  (posts, userId) =>
    posts.filter((post) => Number(post.userId) === Number(userId))
);

export const { postAdded, reactionAdded, increaseCount } = postsSlice.actions;
export default postsSlice.reducer;
