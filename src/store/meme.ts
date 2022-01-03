import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, CommentReaction, MemeReaction } from "../types";

export interface MemeState {
  id?: string;
  reactions?: MemeReaction[];
  comments?: Comment[];
  commentReactions: CommentReactions;
}

export interface AddCommentReactions {
  commentId: string;
  commentReactions: CommentReaction[];
}

interface CommentReactions {
  [commentId: string]: CommentReaction[];
}

const initialState: MemeState = {
  commentReactions: {},
};

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
    addCommentReactions(state, action: PayloadAction<AddCommentReactions>) {
      const nextCommentReactions = { ...state.commentReactions };
      nextCommentReactions[action.payload.commentId] = action.payload.commentReactions;
      state.commentReactions = nextCommentReactions;
    },
  },
});

export const { setId, setReactions, setComments, addCommentReactions } = memeSlice.actions;

export default memeSlice.reducer;
