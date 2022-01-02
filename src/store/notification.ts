import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
  lastUpdated: string | null;
  overrideFromChild: boolean;
}

const initialState: NotificationState = {
  lastUpdated: null,
  overrideFromChild: false,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setLastUpdated(state, action: PayloadAction<string>) {
      state.lastUpdated = action.payload;
    },
    setOverrideFromChild(state, action: PayloadAction<boolean>) {
      state.overrideFromChild = action.payload;
    },
  },
});

export const { setLastUpdated, setOverrideFromChild } = notificationSlice.actions;
export default notificationSlice.reducer;
