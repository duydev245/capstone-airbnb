import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import dataLocation from "./slices/location.slice";
import roleSlice from "./slices/role.slice";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [roleSlice.name]: roleSlice.reducer,
  [dataLocation.name]: dataLocation.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.VITE_NODE_ENV === "doanxem",
});

export default store;
