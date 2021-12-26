import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id?: string;
  email?: string;
  username?: string;
  name?: string;
  googleId?: string;
  picture?: string;
  token?: string;
  usersFollowingIds?: string[];
  usersFollowedByIds?: string[];
  templateIds?: string[];
  memeIds?: string[];
  memeUpvoteIds?: string[];
  commentUpvoteIds?: string[];
  memeReactionIds?: string[];
  commentReactionIds?: string[];
  commentIds?: string[];
  actionIds?: string[];
  notificationIds?: string[];
  memeViewIds?: string[];
  feed?: string[];
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setGoogleId(state, action: PayloadAction<string>) {
      state.googleId = action.payload;
    },
    setPicture(state, action: PayloadAction<string>) {
      state.picture = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUsersFollowingIds(state, action: PayloadAction<string[]>) {
      state.usersFollowingIds = action.payload;
    },
    setUsersFollowedByIds(state, action: PayloadAction<string[]>) {
      state.usersFollowedByIds = action.payload;
    },
    setTemplateIds(state, action: PayloadAction<string[]>) {
      state.templateIds = action.payload;
    },
    setMemeIds(state, action: PayloadAction<string[]>) {
      state.memeIds = action.payload;
    },
    setMemeUpvoteIds(state, action: PayloadAction<string[]>) {
      state.memeUpvoteIds = action.payload;
    },
    setCommentUpvoteIds(state, action: PayloadAction<string[]>) {
      state.commentUpvoteIds = action.payload;
    },
    setCommentReactionIds(state, action: PayloadAction<string[]>) {
      state.commentReactionIds = action.payload;
    },
    setCommentIds(state, action: PayloadAction<string[]>) {
      state.commentIds = action.payload;
    },
    setActionIds(state, action: PayloadAction<string[]>) {
      state.actionIds = action.payload;
    },
    setNotificationIds(state, action: PayloadAction<string[]>) {
      state.notificationIds = action.payload;
    },
    setMemeViewIds(state, action: PayloadAction<string[]>) {
      state.memeViewIds = action.payload;
    },
    setFeed(state, action: PayloadAction<string[]>) {
      state.feed = action.payload;
    },
  },
});

export const {
  setId,
  setEmail,
  setUsername,
  setName,
  setGoogleId,
  setPicture,
  setToken,
  setUsersFollowedByIds,
  setUsersFollowingIds,
  setTemplateIds,
  setMemeIds,
  setMemeUpvoteIds,
  setCommentUpvoteIds,
  setCommentReactionIds,
  setCommentIds,
  setActionIds,
  setNotificationIds,
  setMemeViewIds,
  setFeed,
} = userSlice.actions;

export default userSlice.reducer;
