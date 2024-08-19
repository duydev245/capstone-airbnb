import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listLocation: null,
}

const dataLocation = createSlice({
    name: "dataLocation",
    initialState,

    reducers: {
        setLocation: (state, action) => {
            state.listLocation = action.payload
        },
    }
})

export const { setLocation } = dataLocation.actions;
export default dataLocation