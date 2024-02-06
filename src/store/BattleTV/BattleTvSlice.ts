import {
  Match,
  MatchApi,
  PvPMatch,
  DailyChallengesApi,
} from '@codecharacter-2024/client';
import { apiConfig } from '../../api/ApiConfig';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum BattleType {
  NORMAL,
  PVP,
  DC,
}

export interface Battles {
  battleType: BattleType;
  battles: Match[] | PvPMatch[];
  hasbeenFetched: boolean;
  page: number;
}
export interface BattleTvInterFace {
  loading: boolean;
  hasErrors: boolean;
  Normalbattles: Battles;
  PvPbattles: Battles;
  Dcbattles: Battles;
}

export const initialState = {
  loading: false,
  hasErrors: false,
  Normalbattles: {
    battleType: BattleType.NORMAL,
    battles: [] as Match[],
    hasbeenFetched: false,
    page: 1,
  },
  PvPbattles: {
    battleType: BattleType.PVP,
    battles: [] as PvPMatch[],
    hasbeenFetched: false,
    page: 1,
  },
  Dcbattles: {
    battleType: BattleType.DC,
    battles: [] as Match[],
    hasbeenFetched: false,
    page: 1,
  },
};

export const fetchBattlesAction = createAsyncThunk(
  'battletv/fetchBattlesAction',
  async (
    reqobj: { battleTvType: BattleType; page: number },
    { rejectWithValue },
  ) => {
    try {
      switch (reqobj.battleTvType) {
        case BattleType.NORMAL:
          const matchesAPI = new MatchApi(apiConfig);
          const normalResponse = await matchesAPI.getUserNormalMatches(
            reqobj.page,
          );
          // console.log(normalResponse)
          return {
            battles: normalResponse,
            battleType: BattleType.NORMAL,
            page: reqobj.page,
          };
        case BattleType.PVP:
          const matchesAPI1 = new MatchApi(apiConfig);
          const pvpResponse = await matchesAPI1.getUserPvPMatches(reqobj.page);
          return {
            battles: pvpResponse,
            battleType: BattleType.PVP,
            page: reqobj.page,
          };
        case BattleType.DC:
          const dcAPI = new DailyChallengesApi(apiConfig);
          const dcResponse = await dcAPI.getUserDCMatches(reqobj.page);
          return {
            battles: dcResponse,
            battleType: BattleType.DC,
            page: reqobj.page,
          };
      }
    } catch (error) {
      throw rejectWithValue(error);
    }
  },
);

const battleTvSlice = createSlice({
  name: 'BattleTv',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBattlesAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      switch (payload.battleType) {
        case BattleType.NORMAL:
          state.Normalbattles.battles = payload.battles as Match[];
          state.Normalbattles.hasbeenFetched = true;
          state.Normalbattles.page = payload.page;
          break;
        case BattleType.PVP:
          state.PvPbattles.battles = payload.battles as PvPMatch[];
          state.PvPbattles.hasbeenFetched = true;
          state.PvPbattles.page = payload.page;
          break;
        case BattleType.DC:
          state.Dcbattles.battles = payload.battles as Match[];
          state.Dcbattles.hasbeenFetched = true;
          state.Dcbattles.page = payload.page;
          break;
      }
    });
    builder.addCase(fetchBattlesAction.rejected, state => {
      state.loading = false;
      state.hasErrors = true;
    });
    builder.addCase(fetchBattlesAction.pending, state => {
      state.loading = true;
    });
  },
});

// A selector
export const normalBattleTvSelector = (state: RootState): Battles =>
  state.battletv.Normalbattles;
export const pvpBattleTvSelector = (state: RootState): Battles =>
  state.battletv.PvPbattles;
export const dcBattleTvSelector = (state: RootState): Battles =>
  state.battletv.Dcbattles;
export const loadingSelector = (state: RootState): boolean =>
  state.battletv.loading;

export const hasErrorsSelector = (state: RootState): boolean =>
  state.battletv.hasErrors;

export default battleTvSlice.reducer;
