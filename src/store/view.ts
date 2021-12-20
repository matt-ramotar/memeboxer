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
}

const initialState: ViewState = {
  activePage: Page.Home,
  createTemplate: false,
  colorPicker: false,
};

const viewSlice = createSlice({
  name: "viewSlice",
  initialState,
  reducers: {
    toggleCreateTemplate(state) {
      state.createTemplate = !state.createTemplate;
    },
    toggleColorPicker(state) {
      state.colorPicker = !state.colorPicker;
    },
    setActivePage(state, action: PayloadAction<Page>) {
      state.activePage = action.payload;
    },
  },
});

export const { toggleCreateTemplate, setActivePage, toggleColorPicker } = viewSlice.actions;
export default viewSlice.reducer;
