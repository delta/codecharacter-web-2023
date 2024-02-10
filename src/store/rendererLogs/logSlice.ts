import { RendererUtils } from '@codecharacter-2024/renderer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getLogs } from './logAPI';
import { GameType } from '../editor/code';

const initialState = {
  logs: '',
};

export const getLogAction = createAsyncThunk(
  'logs/getLogs',
  async (idWithCallback: {
    id: string;
    callback: () => void;
    gameType: GameType;
  }) => {
    try {
      getLogs(idWithCallback.id, idWithCallback.gameType).then(logs => {
        idWithCallback.callback();
        setTimeout(() => {
          RendererUtils.loadLog(logs);
        }, 1000);
      });
      return '';
    } catch (error) {
      throw error;
    }
  },
);

export const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLogAction.fulfilled, (state, action) => {
      state.logs = action.payload;
    });
  },
});

export const logs = (state: RootState): string => state.logs.logs;
export default logSlice.reducer;
