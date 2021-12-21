import { configureStore } from "@reduxjs/toolkit";
import createMemeSlice from "./createMeme";
import templateSlice from "./template";
import themeSlice from "./theme";
import userSlice from "./user";
import viewSlice from "./view";

const store = configureStore({
  reducer: {
    createMeme: createMemeSlice,
    template: templateSlice,
    theme: themeSlice,
    user: userSlice,
    view: viewSlice,
  },
  devTools: process.env.REACT_APP_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
