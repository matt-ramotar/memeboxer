import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemeReaction } from "../types";

export interface FeedState {
  memeReactions: MemeReactions;
  overrideMoreInfoFromChild: boolean;
}

interface MemeReactions {
  [memeId: string]: MemeReaction[];
}

export interface AddMemeReactions {
  memeId: string;
  memeReactions: MemeReaction[];
}

export interface AddMemeReaction {
  memeId: string;
  memeReaction: MemeReaction;
}

export interface RemoveMemeReaction {
  memeId: string;
  memeReaction: MemeReaction;
}

const initialState: FeedState = {
  memeReactions: {},
  overrideMoreInfoFromChild: false,
};

const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    addMemeReactions(state, action: PayloadAction<AddMemeReactions>) {
      const nextMemeReactions = { ...state.memeReactions };
      nextMemeReactions[action.payload.memeId] = action.payload.memeReactions;
      state.memeReactions = nextMemeReactions;
    },
    addMemeReaction(state, action: PayloadAction<AddMemeReaction>) {
      const nextMemeReactions = { ...state.memeReactions };
      const nextMemeReactionsList = nextMemeReactions[action.payload.memeId] ? nextMemeReactions[action.payload.memeId] : [];

      nextMemeReactionsList.push(action.payload.memeReaction);

      nextMemeReactions[action.payload.memeId] = nextMemeReactionsList;
      state.memeReactions = nextMemeReactions;
    },
    setOverrideFromChild(state, action: PayloadAction<boolean>) {
      state.overrideMoreInfoFromChild = action.payload;
    },
  },
});

export const { addMemeReactions, addMemeReaction, setOverrideFromChild } = feedSlice.actions;

export default feedSlice.reducer;
