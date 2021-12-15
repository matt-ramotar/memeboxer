import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id?: string;
  email?: string;
  username?: string;
  name?: string;
  googleId?: string;
  picture?: string;
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
  },
});

export const { setId, setEmail, setUsername, setName, setGoogleId, setPicture } = userSlice.actions;

export default userSlice.reducer;
