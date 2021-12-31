import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, CommentReaction } from "../types";

export interface CommentState {
  id?: string;
  reactions?: CommentReaction[];
  children?: Comment[];
}

const initialState: CommentState = {};

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setReactions(state, action: PayloadAction<CommentReaction[]>) {
      state.reactions = [...action.payload];
    },
    setChildComments(state, action: PayloadAction<Comment[]>) {
      state.children = [...action.payload];
    },
  },
});

export const { setId, setReactions, setChildComments } = commentSlice.actions;

export default commentSlice.reducer;
