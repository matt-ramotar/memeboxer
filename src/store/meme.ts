import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, MemeReaction } from "../types";

export interface MemeState {
  id?: string;
  reactions?: MemeReaction[];
  comments?: Comment[];
}

const initialState: MemeState = {};

const memeSlice = createSlice({
  name: "memeSlice",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setReactions(state, action: PayloadAction<MemeReaction[]>) {
      state.reactions = [...action.payload];
    },
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = [...action.payload];
    },
  },
});

export const { setId, setReactions, setComments } = memeSlice.actions;

export default memeSlice.reducer;
