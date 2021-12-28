import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Page {
  Home = "Home",
  Create = "Create",
  Profile = "Profile",
  Explore = "Explore",
  Notifications = "Notifications",
  Threads = "Threads",
  Search = "Search",
}

export interface ViewState {
  activePage: Page;
  username?: string;
  createMeme: boolean;
  createTemplate: boolean;
  colorPicker: boolean;
  lastUpdatedNotifications?: string;
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
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setLastUpdatedNotifications(state, action: PayloadAction<Date>) {
      state.lastUpdatedNotifications = action.payload.toString();
    },
  },
});

export const { toggleCreateTemplate, setActivePage, toggleColorPicker, toggleCreateMeme, setUsername, setLastUpdatedNotifications } = viewSlice.actions;
export default viewSlice.reducer;
