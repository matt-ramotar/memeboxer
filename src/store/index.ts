import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./comment";
import createMemeSlice from "./createMeme";
import memeSlice from "./meme";
import notificationSlice from "./notification";
import searchSlice from "./search";
import templateSlice from "./template";
import themeSlice from "./theme";
import userSlice from "./user";
import viewSlice from "./view";

const store = configureStore({
  reducer: {
    comment: commentSlice,
    createMeme: createMemeSlice,
    meme: memeSlice,
    notification: notificationSlice,
    search: searchSlice,
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
