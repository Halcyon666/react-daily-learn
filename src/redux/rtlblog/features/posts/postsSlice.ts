// src/redux/rtlblog/features/posts/postsSlice.ts
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import type { RootState } from "../../store";
import { apiSlice as baseApiSlice } from "../api/apiSlice";

export interface Reactions {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface PostData {
  id: string;
  title: string;
  body: string;
  userId?: string;
  date: string;
  reactions: Reactions;
}

const postsAdapter = createEntityAdapter<PostData>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

// inject endpoints into the base apiSlice we created earlier
export const extenedApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<
      // returned type (EntityState<PostData>)
      ReturnType<typeof postsAdapter.getInitialState>,
      // query arg type
      void
    >({
      query: () => "/posts",
      transformResponse: (responseData: PostData[]) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date) {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          }

          if (!post?.reactions) {
            post.reactions = {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            };
          }

          return post;
        });

        // return a normalized EntityState<PostData>
        return postsAdapter.setAll(initialState, loadedPosts);
      },

      // providesTags must produce TagDescription<'post'> items (type must be the exact tag name)
      providesTags: (result) =>
        result
          ? [
              { type: "Post" as const, id: "LIST" },
              ...result.ids.map((id) => ({ type: "Post" as const, id })),
            ]
          : [{ type: "Post" as const, id: "LIST" }],
    }),
    getPostsByUserId: builder.query({
      query: (id) => `/posts/?userId=${id}`,
      transformResponse: (responseData: PostData[]) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date) {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          }
          if (!post?.reactions) {
            post.reactions = {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            };
          }
          return post;
        });
        // return a normalized EntityState<PostData>
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result) => {
        console.log(result);
        const r = result
          ? [
              { type: "Post" as const, id: "LIST" },
              ...result.ids.map((id) => ({ type: "Post" as const, id })),
            ]
          : [{ type: "Post" as const, id: "LIST" }];
        return r;
      },
    }),
    addNewPost: builder.mutation({
      query: (initialState) => ({
        url: "/posts",
        method: "POST",
        body: {
          ...initialState,
          userId: Number(initialState.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          },
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: "PUT",
        body: {
          ...initialPost,
          date: new Date().toISOString(),
        },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      query: ({ postId, reactions }) => ({
        url: `posts/${postId}`,
        method: "PATCH",
        body: { reactions },
      }),
      async onQueryStarted(
        { postId, reactions },
        { dispatch, queryFulfilled }
      ) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const pathResult = dispatch(
          extenedApiSlice.util.updateQueryData(
            "getPosts",
            undefined,
            (draft) => {
              // The `draft` is  Immer-wrapped and can be "mutated" like in createSlice
              // Immer tracks all your “writes” and produces a new immutable state object.
              const post = draft.entities[postId];
              if (post) post.reactions = reactions;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          pathResult.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddReactionMutation,
} = extenedApiSlice;

export const selectPostsResult = extenedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data
);

// Selectors: derive the EntityState<PostData> from the RTK Query cache
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state: RootState) => selectPostsData(state) ?? initialState
);
