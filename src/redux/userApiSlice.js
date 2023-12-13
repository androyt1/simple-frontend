import { api } from "./api";

export const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                method: "POST",
                url: `/api/v1/auth/register`,
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
        login: builder.mutation({
            query: (user) => ({
                method: "POST",
                url: "/api/v1/auth/login",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
        profile: builder.query({
            query: () => ({
                method: "GET",
                url: "/api/v1/auth/dashboard",
            }),
            providesTags: ["Users"],
        }),
        allUsers: builder.query({
            query: () => ({
                method: "GET",
                url: "/api/v1/auth/all-users",
            }),
            providesTags: ["Users"],
        }),
    }),
});
export const { useRegisterMutation, useLoginMutation, useProfileQuery, useAllUsersQuery } =
    authSlice;
