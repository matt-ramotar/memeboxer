import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  input: string | null;
}

const initialState: SearchState = {
  input: null,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string | null>) {
      state.input = action.payload;
    },
  },
});

export const { setInput } = searchSlice.actions;

export default searchSlice.reducer;
