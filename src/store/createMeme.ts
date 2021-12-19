import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateMemeState {
  currentJob: number;
  templateId: string | null;
  tagIds: string[] | null;
}

const initialState: CreateMemeState = {
  currentJob: 1,
  templateId: null,
  tagIds: null,
};

const createMemeSlice = createSlice({
  name: "createMemeSlice",
  initialState,
  reducers: {
    setCurrentJob(state, action: PayloadAction<number>) {
      state.currentJob = action.payload;
    },
    setTemplateId(state, action: PayloadAction<string | null>) {
      state.templateId = action.payload;
    },
    setTagIds(state, action: PayloadAction<string[] | null>) {
      state.tagIds = action.payload;
    },
  },
});

export const { setCurrentJob, setTemplateId, setTagIds } = createMemeSlice.actions;
export default createMemeSlice.reducer;
