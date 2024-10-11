import { createSlice, current } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils";

const roleLocalStorage = getLocalStorage('role');

const initialState = {
    currentRole: roleLocalStorage,
};


const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.currentRole = action.payload;
        },
        removeRole: (state) => {
            state.currentRole = null;
        },
    },
})

export const { setRole, removeRole } = roleSlice.actions;
export default roleSlice;