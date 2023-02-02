import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface selfMatchModalState {
  isSelfMatchModalOpen: boolean;
  codeCommitID: string | null;
  mapCommitID: string | null;
  codeCommitName: string;
  mapCommitName: string;
  // dailyChallengeSimulate : boolean;
}

const initialState: selfMatchModalState = {
  isSelfMatchModalOpen: false,
  codeCommitID: null,
  mapCommitID: null,
  codeCommitName: 'Current Code',
  mapCommitName: 'Current Map',
  // dailyChallengeSimulate: false,
};

export const selfMatchModalSlice = createSlice({
  name: 'selfMatchModalState',
  initialState,
  reducers: {
    isSelfMatchModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isSelfMatchModalOpen = action.payload;
    },
    codeCommitIDChanged: (state, action: PayloadAction<string | null>) => {
      state.codeCommitID = action.payload;
    },
    mapCommitIDChanged: (state, action: PayloadAction<string | null>) => {
      state.mapCommitID = action.payload;
    },
    codeCommitNameChanged: (state, action: PayloadAction<string>) => {
      state.codeCommitName = action.payload;
    },
    mapCommitNameChanged: (state, action: PayloadAction<string>) => {
      state.mapCommitName = action.payload;
    },
    // simulateDailyChallenge: (state, action: PayloadAction<boolean>) => {
    //   state.dailyChallengeSimulate = action.payload;
    // }
  },
});

export const {
  isSelfMatchModalOpened,
  codeCommitIDChanged,
  mapCommitIDChanged,
  codeCommitNameChanged,
  mapCommitNameChanged,
  // simulateDailyChallenge,
} = selfMatchModalSlice.actions;

export const isSelfMatchModalOpen = (state: RootState): boolean =>
  state.selfMatchModal.isSelfMatchModalOpen;
export const codeCommitID = (state: RootState): string | null =>
  state.selfMatchModal.codeCommitID;
export const mapCommitID = (state: RootState): string | null =>
  state.selfMatchModal.mapCommitID;
export const codeCommitName = (state: RootState): string =>
  state.selfMatchModal.codeCommitName;
export const mapCommitName = (state: RootState): string =>
  state.selfMatchModal.mapCommitName;
// export const dailyChallengeSimulate = (state: RootState): boolean =>
//   state.selfMatchModal.dailyChallengeSimulate;

export default selfMatchModalSlice.reducer;
