import { ChallengeType, TutorialsGetRequest } from '@codecharacter-2024/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CodeAndLanguage, languagesAvailable } from '../editor/code';
import defaultCppCode from '../../assets/codes/cpp/run.cpp?raw';
import defaultPythonCode from '../../assets/codes/python/run.py?raw';
import defaultJavaCode from '../../assets/codes/java/Run.java?raw';

export interface TutorialStateType {
  tutorials: TutorialsGetRequest;
  tutorialCode: string | undefined;
  tutorialAllLanguagesCode: string[];
  tutorialLanguage: string;
  tutorialMap: Array<Array<number>>;
  isCompleted: boolean;
  tutorialId: number;
}

const initialState: TutorialStateType = {
  tutorials: {
    tutorialName: '',
    description: '',
    tutorialType: '' as ChallengeType,
    tutorialCodes: {
      cpp: ' ',
      java: ' ',
      python: ' ',
      image: ' ',
    },
  },
  tutorialCode: defaultCppCode,
  tutorialAllLanguagesCode: [
    defaultCppCode,
    defaultPythonCode,
    defaultJavaCode,
  ],
  tutorialLanguage: 'c_cpp',
  tutorialMap: [],
  isCompleted: false,
  tutorialId: 1,
};

export const tutorialsSlice = createSlice({
  name: 'tutorialsState',
  initialState,
  reducers: {
    initializeTutorialState: (
      state,
      action: PayloadAction<TutorialsGetRequest>,
    ) => {
      state.tutorials.tutorialName = action.payload.tutorialName;
      (state.tutorials.description = action.payload.description
        ? action.payload.description
        : ''),
        (state.tutorials.tutorialCodes = action.payload.tutorialCodes);
      state.tutorialCode = action.payload.tutorialCodes.cpp;
      state.tutorialAllLanguagesCode[0] = action.payload.tutorialCodes.cpp;
      state.tutorialAllLanguagesCode[1] = action.payload.tutorialCodes.python;
      state.tutorialAllLanguagesCode[2] = action.payload.tutorialCodes.java;
      state.isCompleted = false;
    },
    changeTutorialCode: (state, action: PayloadAction<CodeAndLanguage>) => {
      const tempCurrentUserLanguage = action.payload.currentUserLanguage;
      const desiredIndex = languagesAvailable.indexOf(tempCurrentUserLanguage);
      const newCodeAndLanguage: CodeAndLanguage = {
        currentUserCode: action.payload.currentUserCode,
        currentUserLanguage: action.payload.currentUserLanguage,
      };
      state.tutorialAllLanguagesCode[desiredIndex] =
        newCodeAndLanguage.currentUserCode;
      state.tutorialCode = newCodeAndLanguage.currentUserCode;
    },
    changeTutorialLanguage: (state, action: PayloadAction<string>) => {
      const tempCurrentUserLanguage = action.payload;
      const desiredIndex = languagesAvailable.indexOf(tempCurrentUserLanguage);
      state.tutorialCode = state.tutorialAllLanguagesCode[desiredIndex];
      state.tutorialLanguage = action.payload;
    },
    changeTutorialMap: (state, action: PayloadAction<Array<Array<number>>>) => {
      state.tutorialMap = action.payload;
    },
    changeTutorialId: (state, action: PayloadAction<number>) => {
      if (action.payload == 1) {
        state.tutorialId = state.tutorialId + 1;
      } else {
        state.tutorialId = state.tutorialId - 1;
      }
    },
    changeCompletionState: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
  },
});

export const {
  initializeTutorialState,
  changeTutorialCode,
  changeTutorialLanguage,
  changeTutorialMap,
  changeCompletionState,
  changeTutorialId,
} = tutorialsSlice.actions;
export const tutorialState = (state: RootState): TutorialsGetRequest =>
  state.tutorials.tutorials;
export const tutorialCode = (state: RootState): string =>
  state.tutorials.tutorialCode;
export const tutorialDescription = (state: RootState): string | undefined =>
  state.tutorials.tutorials.description;
export const tutorialId = (state: RootState): number =>
  state.tutorials.tutorialId;
export const tutorialCodeLanguage = (state: RootState): string =>
  state.tutorials.tutorialLanguage;
export const tutorialMap = (state: RootState): Array<Array<number>> =>
  state.tutorials.tutorialMap;
export const tutorialCompletion = (state: RootState): boolean =>
  state.tutorials.isCompleted;
export const tutorialAllLanguagesCode = (state: RootState): string[] =>
  state.tutorials.tutorialAllLanguagesCode;

export default tutorialsSlice.reducer;
