import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MapObj = {
  map: Array<Array<number>>;
  mapImg: string;
};

export interface historyEditorState {
  code: string;
  map: MapObj;
}

const initialState: historyEditorState = {
  code: '',
  map: {
    map: [],
    mapImg: '',
  },
};

export const historyEditorSlice = createSlice({
  name: 'historyEditor',
  initialState,
  reducers: {
    changeHistoryEditorCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    changeHistoryEditorMap: (state, action: PayloadAction<MapObj>) => {
      state.map = action.payload;
    },
  },
});

export const { changeHistoryEditorCode, changeHistoryEditorMap } =
  historyEditorSlice.actions;

export default historyEditorSlice.reducer;
