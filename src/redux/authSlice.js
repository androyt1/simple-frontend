import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    users: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },

        clear: (state, action) => {
            state.user = null;
            localStorage.clear();
        },
    },
});
export const { setUser, clear } = authSlice.actions;
export default authSlice.reducer;
