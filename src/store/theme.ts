import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  lastColorPicked: string;
  lastFontFamilyPicked: string;
  lastFontSize: number;
  lastIsBold: boolean;
  lastIsItalic: boolean;
}

const initialState: ThemeState = {
  lastColorPicked: "#fff",
  lastFontFamilyPicked: "Impact",
  lastFontSize: 30,
  lastIsBold: false,
  lastIsItalic: false,
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setLastColorPicked(state, action: PayloadAction<string>) {
      state.lastColorPicked = action.payload;
    },
    setLastFontFamilyPicked(state, action: PayloadAction<string>) {
      state.lastFontFamilyPicked = action.payload;
    },
    setLastFontSize(state, action: PayloadAction<number>) {
      state.lastFontSize = action.payload;
    },
    setLastIsBold(state, action: PayloadAction<boolean>) {
      state.lastIsBold = action.payload;
    },
    setLastIsItalic(state, action: PayloadAction<boolean>) {
      state.lastIsItalic = action.payload;
    },
  },
});

export const { setLastColorPicked, setLastFontFamilyPicked, setLastFontSize, setLastIsBold, setLastIsItalic } = themeSlice.actions;
export default themeSlice.reducer;
