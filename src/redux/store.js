import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import dataMovie from "./slices/movie.slice";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [dataMovie.name]: dataMovie.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_NODE_ENV === "doanxem",
});

export default store;
