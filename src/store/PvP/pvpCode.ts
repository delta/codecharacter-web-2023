import { Code } from '@codecharacter-2024/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import defaultCppCode from '../../assets/codes/cpp/runpvp.cpp?raw';
import defaultPythonCode from '../../assets/codes/python/runpvp.py?raw';
import defaultJavaCode from '../../assets/codes/java/RunPvP.java?raw';

export const languagesAvailable = ['c_cpp', 'python', 'java'];

export interface pvpEditorStateType {
  pvpAllLanguagesCode: string[];
  pvpUserCode: string;
  pvpLanguage: string;
  pvpLastSavedAt: Date;
}

const initialState: pvpEditorStateType = {
  pvpAllLanguagesCode: [defaultCppCode, defaultPythonCode, defaultJavaCode],
  pvpUserCode: '',
  pvpLanguage: 'c_cpp',
  pvpLastSavedAt: new Date(),
};

export interface PvPCodeAndLanguage {
  currentUserCode: string;
  currentUserLanguage: string;
}

export const pvpEditorSlice = createSlice({
  name: 'pvpEditorState',
  initialState: initialState,
  reducers: {
    initializePvPEditorStates: (state, action: PayloadAction<Code>) => {
      state.pvpUserCode = action.payload.code;
      if (action.payload.language === 'C' || action.payload.language === 'CPP')
        state.pvpLanguage = 'c_cpp';
      else if (action.payload.language === 'PYTHON')
        state.pvpLanguage = 'python';
      else if (action.payload.language === 'JAVA') state.pvpLanguage = 'java';
      state.pvpLastSavedAt = action.payload.lastSavedAt;
      const desiredIndex = languagesAvailable.indexOf(state.pvpLanguage);
      state.pvpAllLanguagesCode[desiredIndex] = action.payload.code;
    },

    updatePvPUserCode: (state, action: PayloadAction<PvPCodeAndLanguage>) => {
      const tempCurrentUserLanguage = action.payload.currentUserLanguage;
      const desiredIndex = languagesAvailable.indexOf(tempCurrentUserLanguage);
      const newCodeAndLanguage: PvPCodeAndLanguage = {
        currentUserCode: action.payload.currentUserCode,
        currentUserLanguage: action.payload.currentUserLanguage,
      };

      state.pvpAllLanguagesCode[desiredIndex] =
        newCodeAndLanguage.currentUserCode;
      state.pvpUserCode = newCodeAndLanguage.currentUserCode;
    },

    changePvPLanguage: (state, action: PayloadAction<string>) => {
      console.log('lang changed');
      const tempCurrentUserLanguage = action.payload;
      const desiredIndex = languagesAvailable.indexOf(tempCurrentUserLanguage);
      state.pvpUserCode = state.pvpAllLanguagesCode[desiredIndex];
      state.pvpLanguage = action.payload;
    },
  },
});

export const {
  updatePvPUserCode,
  changePvPLanguage,
  initializePvPEditorStates,
} = pvpEditorSlice.actions;
export const PvPUserCode = (state: RootState): string =>
  state.pvpEditorReducer.pvpUserCode;
export const PvPUserLanguage = (state: RootState): string =>
  state.pvpEditorReducer.pvpLanguage;
export default pvpEditorSlice.reducer;
