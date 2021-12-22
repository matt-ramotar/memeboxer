import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Page {
  Home = "Home",
  Create = "Create",
  Profile = "Profile",
  Explore = "Explore",
  Notifications = "Notifications",
  Threads = "Threads",
}

export interface ViewState {
  activePage: Page;
  createMeme: boolean;
  createTemplate: boolean;
  colorPicker: boolean;
}

const initialState: ViewState = {
  activePage: Page.Home,
  createTemplate: false,
  createMeme: false,
  colorPicker: false,
};

const viewSlice = createSlice({
  name: "viewSlice",
  initialState,
  reducers: {
    toggleCreateTemplate(state) {
      state.createTemplate = !state.createTemplate;
    },
    toggleCreateMeme(state) {
      state.createMeme = !state.createMeme;
    },
    toggleColorPicker(state, action: PayloadAction<boolean>) {
      state.colorPicker = action.payload;
    },
    setActivePage(state, action: PayloadAction<Page>) {
      state.activePage = action.payload;
    },
  },
});

export const { toggleCreateTemplate, setActivePage, toggleColorPicker, toggleCreateMeme } = viewSlice.actions;
export default viewSlice.reducer;
