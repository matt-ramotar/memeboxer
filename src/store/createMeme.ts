import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateMemeState {
  currentJob: number;
  templateId: string | null;
  componentMap: {
    [id: string]: TextComponent;
  };
  activeComponent: string | null;
  tagIds: string[] | null;
  data: string | null;
}

export interface TextComponent {
  id: string;
  text: string;
  style: Style;
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
  color: string;
  fontSize: number;
  fontFamily: string;
  isBold: boolean;
  isItalic: boolean;
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
  activeComponent: null,
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
    setActiveComponent(state, action: PayloadAction<string | null>) {
      state.activeComponent = action.payload;
    },
    setFontSize(state, action: PayloadAction<number>) {
      if (state.activeComponent) {
        state.componentMap[state.activeComponent].style.fontSize = action.payload;
      }
    },

    incrementFontSize(state) {
      if (state.activeComponent) {
        const nextTextComponent = { ...state.componentMap[state.activeComponent] };
        nextTextComponent.style.fontSize += 4;
        nextTextComponent.style.fontSize = Math.min(nextTextComponent.style.fontSize, 250);
        state.componentMap[nextTextComponent.id] = nextTextComponent;
      }
    },

    decrementFontSize(state) {
      if (state.activeComponent) {
        const nextTextComponent = { ...state.componentMap[state.activeComponent] };
        nextTextComponent.style.fontSize -= 4;
        nextTextComponent.style.fontSize = Math.max(nextTextComponent.style.fontSize, 0);
        state.componentMap[nextTextComponent.id] = nextTextComponent;
      }
    },
    setText(state, action: PayloadAction<string>) {
      if (state.activeComponent) {
        state.componentMap[state.activeComponent].text = action.payload;
      }
    },

    setColor(state, action: PayloadAction<string>) {
      if (state.activeComponent) {
        const nextTextComponent = { ...state.componentMap[state.activeComponent] };
        nextTextComponent.style.color = action.payload;
        state.componentMap[nextTextComponent.id] = nextTextComponent;
      }
    },

    setFontFamily(state, action: PayloadAction<string>) {
      if (state.activeComponent) {
        const nextTextComponent = { ...state.componentMap[state.activeComponent] };
        nextTextComponent.style.fontFamily = action.payload;
        state.componentMap[nextTextComponent.id] = nextTextComponent;
      }
    },

    setIsBold(state, action: PayloadAction<boolean>) {
      if (state.activeComponent) {
        const nextTextComponent = { ...state.componentMap[state.activeComponent] };
        nextTextComponent.style.isBold = action.payload;
        state.componentMap[nextTextComponent.id] = nextTextComponent;
      }
    },

    setIsItalic(state, action: PayloadAction<boolean>) {
      if (state.activeComponent) {
        const nextTextComponent = { ...state.componentMap[state.activeComponent] };
        nextTextComponent.style.isItalic = action.payload;
        state.componentMap[nextTextComponent.id] = nextTextComponent;
      }
    },
    removeComponent(state, action: PayloadAction<string>) {
      const nextComponentMap = { ...state.componentMap };
      delete nextComponentMap[action.payload];
      state.componentMap = nextComponentMap;

      if (state.activeComponent == action.payload) {
        state.activeComponent = Object.keys(state.componentMap)[0];
      }
    },
  },
});

export const {
  setCurrentJob,
  setTemplateId,
  setTagIds,
  addComponent,
  setData,
  clearComponents,
  setActiveComponent,
  setFontSize,
  removeComponent,
  setText,
  setColor,
  setIsBold,
  setIsItalic,
  incrementFontSize,
  decrementFontSize,
  setFontFamily,
} = createMemeSlice.actions;
export default createMemeSlice.reducer;
