import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateMemeState {
  currentJob: number;
  templateId: string | null;
  componentMap: {
    [id: string]: TextComponent;
  };
  tagIds: string[] | null;
  data: string | null;
}

export interface TextComponent {
  id: string;
  text: string;
  style?: Style;
  layout: Layout;
  size: Size;
}

export interface Size {
  width: number;
  padding?: Padding;
}

export interface Layout {
  startX: number;
  startY: number;
  rotation: Rotation;
}

export interface Style {
  backgroundColor?: string;
  color?: string;
}

export interface Padding {
  start: number;
  end: number;
  top: number;
  bottom: number;
}

export interface Rotation {
  isPositive: boolean;
  degrees: number;
}

const initialState: CreateMemeState = {
  currentJob: 1,
  templateId: null,
  tagIds: null,
  componentMap: {},
  data: null,
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
    addComponent(state, action: PayloadAction<TextComponent>) {
      state.componentMap[action.payload.id] = action.payload;
    },
    setData(state, action: PayloadAction<string>) {
      state.data = action.payload;
    },
    clearComponents(state) {
      state.componentMap = {};
    },
  },
});

export const { setCurrentJob, setTemplateId, setTagIds, addComponent, setData, clearComponents } = createMemeSlice.actions;
export default createMemeSlice.reducer;
