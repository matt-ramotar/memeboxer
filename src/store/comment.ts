import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, CommentReaction } from "../types";

export interface CommentState {
  id?: string;
  reactions?: CommentReaction[];
  children?: Comment[];
  childrenReactions: ChildrenReactions;
}

export interface AddChildReactions {
  childCommentId: string;
  commentReactions: CommentReaction[];
}

interface ChildrenReactions {
  [childCommentId: string]: CommentReaction[];
}

const initialState: CommentState = {
  childrenReactions: {},
};

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
    addChildReactions(state, action: PayloadAction<AddChildReactions>) {
      const nextChildrenReactions = state.childrenReactions ? { ...state.childrenReactions } : {};
      nextChildrenReactions[action.payload.childCommentId] = action.payload.commentReactions;
      state.childrenReactions = nextChildrenReactions;
    },
  },
});

export const { setId, setReactions, setChildComments, addChildReactions } = commentSlice.actions;

export default commentSlice.reducer;
