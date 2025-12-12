import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice as baseApiSlice } from "../api/apiSlice";

interface User {
  id: string;
  name: string;
}
const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();

export const extenedApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      ReturnType<typeof usersAdapter.getInitialState>,
      void
    >({
      query: () => "/users",
      transformResponse: (resData: User[]) => {
        return usersAdapter.setAll(initialState, resData);
      },
      providesTags: (result) =>
        result
          ? [
              { type: "User" as const, id: "LIST" },
              ...result.ids.map((id) => ({ type: "Post" as const, id })),
            ]
          : [{ type: "User" as const, id: "LIST" }],
    }),
  }),
});

export const useGetUserById = (userId: string) => {
  return useGetUsersQuery(undefined, {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });
};

export const { useGetUsersQuery } = extenedApiSlice;
