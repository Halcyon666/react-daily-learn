// src/redux/rtlblog/features/posts/postsSlice.ts
import { createEntityAdapter } from "@reduxjs/toolkit";
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
      query: () => "/post",
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
              { type: "post" as const, id: "LIST" },
              ...result.ids.map((id) => ({ type: "post" as const, id })),
            ]
          : [{ type: "post" as const, id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery } = extenedApiSlice;

// Selectors: derive the EntityState<PostData> from the RTK Query cache
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => {
  // IMPORTANT: .select(undefined) for a query with no parameters
  const queryResult =
    extenedApiSlice.endpoints.getPosts.select(undefined)(state);
  // queryResult?.data is the normalized EntityState<PostData> we returned in transformResponse
  return queryResult?.data ?? initialState;
});
