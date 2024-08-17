import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cinemasId: null,
};

const dataMovie = createSlice({
    name: "dataMovie",
    initialState,

    reducers: {
        setCinemasId: (state, action) => {
            state.cinemasId = action.payload
        },
    },
});

export const { setCinemasId } = dataMovie.actions;
export default dataMovie