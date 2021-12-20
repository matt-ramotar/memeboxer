import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Page {
  Home = "Home",
  Create = "Create",
  Profile = "Profile",
  Explore = "Explore",
}

export interface ViewState {
  activePage: Page;
  createTemplate: boolean;
  colorPicker: boolean;
  lastColorPicked: string;
}

const initialState: ViewState = {
  activePage: Page.Home,
  createTemplate: false,
  colorPicker: false,
  lastColorPicked: "#0160FE",
};

const viewSlice = createSlice({
  name: "viewSlice",
  initialState,
  reducers: {
    toggleCreateTemplate(state) {
      state.createTemplate = !state.createTemplate;
    },
    toggleColorPicker(state, action: PayloadAction<boolean>) {
      state.colorPicker = action.payload;
    },
    setActivePage(state, action: PayloadAction<Page>) {
      state.activePage = action.payload;
    },
    setLastColorPicked(state, action: PayloadAction<string>) {
      state.lastColorPicked = action.payload;
    },
  },
});

export const { toggleCreateTemplate, setActivePage, toggleColorPicker, setLastColorPicked } = viewSlice.actions;
export default viewSlice.reducer;
