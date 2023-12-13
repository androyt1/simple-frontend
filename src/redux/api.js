import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://simple-backend-jxsu.onrender.com",
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = Cookies.get("jwt"); // Assuming you have a token stored in the auth slice
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json"); // Set other headers if needed
            return headers;
        },
    }),
    tagTypes: ["Users"],
    endpoints: () => ({}),
});
