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
}

const initialState: ViewState = {
  activePage: Page.Home,
  createTemplate: false,
};

const viewSlice = createSlice({
  name: "viewSlice",
  initialState,
  reducers: {
    toggleCreateTemplate(state) {
      state.createTemplate = !state.createTemplate;
    },
    setActivePage(state, action: PayloadAction<Page>) {
      state.activePage = action.payload;
    },
  },
});

export const { toggleCreateTemplate, setActivePage } = viewSlice.actions;
export default viewSlice.reducer;
