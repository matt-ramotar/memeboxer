import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TemplateState {
  id?: string;
  entityTag?: string;
}

const initialState: TemplateState = {};

const templateSlice = createSlice({
  name: "templateSlice",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    setEntityTag(state, action: PayloadAction<string>) {
      state.entityTag = action.payload;
    },
  },
});

export const { setId, setEntityTag } = templateSlice.actions;
export default templateSlice.reducer;
