import { DailyChallengeGetRequest } from '@codecharacter-2023/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CodeAndLanguage, languagesAvailable } from '../editor/code';
import defaultCppCode from '../../assets/codes/cpp/run.cpp?raw';
import defaultPythonCode from '../../assets/codes/python/run.py?raw';
import defaultJavaCode from '../../assets/codes/java/Run.java?raw';

export interface DailyChallengeStateType {
  dailyChallenge: DailyChallengeGetRequest;
  pageType: 'Dashboard' | 'DailyChallenge';
  dcCode: string;
  dcAllLanguagesCode: string[];
  codeLanguage: string;
  dcMap: Array<Array<number>>;
  isSimulating: boolean;
}

const initialState: DailyChallengeStateType = {
  dailyChallenge: {
    challName: '',
    description: '',
    chall: '',
    challType: '',
    completionStatus: false,
  },
  pageType: 'Dashboard',
  dcCode: defaultCppCode,
  dcAllLanguagesCode: [defaultCppCode, defaultPythonCode, defaultJavaCode],
  codeLanguage: 'c_cpp',
  dcMap: [],
  isSimulating: false,
};

export const dailyChallengeSlice = createSlice({
  name: 'dailyChallengeState',
  initialState,
  reducers: {
    initializeDailyChallengeState: (
      state,
      action: PayloadAction<DailyChallengeGetRequest>,
    ) => {
      (state.dailyChallenge.challName = action.payload.challName),
        (state.dailyChallenge.description = action.payload.description
          ? action.payload.description
          : ''),
        (state.dailyChallenge.challType = action.payload.challType),
        (state.dailyChallenge.chall = action.payload.chall),
        (state.dailyChallenge.completionStatus = action.payload.completionStatus
          ? action.payload.completionStatus
          : false);
    },
    changePageState: (
      state,
      action: PayloadAction<'Dashboard' | 'DailyChallenge'>,
    ) => {
      state.pageType = action.payload;
    },
    changeDcCode: (state, action: PayloadAction<CodeAndLanguage>) => {
      const tempCurrentUserLanguage = action.payload.currentUserLanguage;
      const desiredIndex = languagesAvailable.indexOf(tempCurrentUserLanguage);
      state.dcAllLanguagesCode[desiredIndex] = action.payload.currentUserCode;
      state.dcCode = action.payload.currentUserCode;
    },
    changeDcLanguage: (state, action: PayloadAction<string>) => {
      const tempCurrentUserLanguage = action.payload;
      const desiredIndex = languagesAvailable.indexOf(tempCurrentUserLanguage);
      state.dcCode = state.dcAllLanguagesCode[desiredIndex];
      state.codeLanguage = action.payload;
    },
    changeDcMap: (state, action: PayloadAction<Array<Array<number>>>) => {
      state.dcMap = action.payload;
    },
    changeSimulationState: (state, action: PayloadAction<boolean>) => {
      state.isSimulating = action.payload;
    },
  },
});

export const {
  initializeDailyChallengeState,
  changePageState,
  changeDcCode,
  changeDcLanguage,
  changeDcMap,
  changeSimulationState,
} = dailyChallengeSlice.actions;
export const dailyChallengeState = (
  state: RootState,
): DailyChallengeGetRequest => state.dailyChallenge.dailyChallenge;
export const dailyChallengePageState = (
  state: RootState,
): 'Dashboard' | 'DailyChallenge' => state.dailyChallenge.pageType;
export const dailyChallengeCompletionState = (
  state: RootState,
): boolean | undefined => state.dailyChallenge.dailyChallenge.completionStatus;
export const dcCode = (state: RootState): string => state.dailyChallenge.dcCode;
export const dcCodeLanguage = (state: RootState): string =>
  state.dailyChallenge.codeLanguage;
export const dcDescription = (state: RootState): string | undefined =>
  state.dailyChallenge.dailyChallenge.description;
export const dcMap = (state: RootState): Array<Array<number>> =>
  state.dailyChallenge.dcMap;
export const dcSimulation = (state: RootState): boolean =>
  state.dailyChallenge.isSimulating;
export default dailyChallengeSlice.reducer;
