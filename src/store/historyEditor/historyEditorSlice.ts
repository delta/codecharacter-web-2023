import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type MapObj = {
  map: Array<Array<number>>;
  mapImg: string;
};

export type mapImagesByCommitIds = {
  CommitId: string;
  Image: string;
};

export interface historyEditorState {
  code: string;
  map: MapObj;
  mapCommitDetails: mapImagesByCommitIds[];
}

const initialState: historyEditorState = {
  code: '',
  map: {
    map: [],
    mapImg: '',
  },
  mapCommitDetails: [],
};

export const historyEditorSlice = createSlice({
  name: 'historyEditor',
  initialState,
  reducers: {
    changeHistoryEditorCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    changeHistoryEditorMap: (state, action: PayloadAction<MapObj>) => {
      localStorage.setItem(
        'cc-map-designer-map',
        JSON.stringify(action.payload.map),
      );
      state.map = action.payload;
    },
    addMapCommit: (state, action: PayloadAction<mapImagesByCommitIds>) => {
      const tempNewCommitObj: mapImagesByCommitIds = {
        CommitId: '',
        Image: '',
      };
      tempNewCommitObj.CommitId = action.payload.CommitId;
      tempNewCommitObj.Image = action.payload.Image;
      state.mapCommitDetails.push(tempNewCommitObj);
    },
  },
});

export const { changeHistoryEditorCode, changeHistoryEditorMap, addMapCommit } =
  historyEditorSlice.actions;
export const mapImagesByCommits = (state: RootState): mapImagesByCommitIds[] =>
  state.historyEditor.mapCommitDetails;
export default historyEditorSlice.reducer;
