import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface PvPSelfMatchModalState {
  isPvPSelfMatchModalOpen: boolean;
  code1CommitID: string | null;
  code2CommitID: string | null;
  code1CommitName: string;
  code2CommitName: string;
}

const initialState: PvPSelfMatchModalState = {
  isPvPSelfMatchModalOpen: false,
  code1CommitID: null,
  code2CommitID: null,
  code1CommitName: 'Current Player 1 Code',
  code2CommitName: 'Current Player 2 Code',
};

export const PvPSelfMatchModalSlice = createSlice({
  name: 'PvPSelfMatchModalState',
  initialState,
  reducers: {
    isPvPSelfMatchModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isPvPSelfMatchModalOpen = action.payload;
    },
    code1CommitIDChanged: (state, action: PayloadAction<string | null>) => {
      state.code1CommitID = action.payload;
    },
    code2CommitIDChanged: (state, action: PayloadAction<string | null>) => {
      state.code2CommitID = action.payload;
    },
    code1CommitNameChanged: (state, action: PayloadAction<string>) => {
      state.code1CommitName = action.payload;
    },
    code2CommitNameChanged: (state, action: PayloadAction<string>) => {
      state.code2CommitName = action.payload;
    },
  },
});

export const {
  isPvPSelfMatchModalOpened,
  code1CommitIDChanged,
  code2CommitIDChanged,
  code1CommitNameChanged,
  code2CommitNameChanged,
} = PvPSelfMatchModalSlice.actions;

export const isPvPSelfMatchModalOpen = (state: RootState): boolean =>
  state.pvpSelfMatchModal.isPvPSelfMatchModalOpen;
export const code1CommitID = (state: RootState): string | null =>
  state.pvpSelfMatchModal.code1CommitID;
export const code2CommitID = (state: RootState): string | null =>
  state.pvpSelfMatchModal.code2CommitID;
export const code1CommitName = (state: RootState): string =>
  state.pvpSelfMatchModal.code1CommitName;
export const code2CommitName = (state: RootState): string =>
  state.pvpSelfMatchModal.code2CommitName;

export default PvPSelfMatchModalSlice.reducer;
