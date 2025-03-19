import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        // Add update user actions
        updateUserStart: (state) => {
            state.loading = true;
            state.error = null
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
        },
        updateUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        // Add sign out action
        signOut: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        // Add delete user actions
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = null
        },
        deleteUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    signOut,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure
} = UserSlice.actions;

export default UserSlice.reducer;