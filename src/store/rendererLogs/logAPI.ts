import { ApiError, apiConfig } from '../../api/ApiConfig';
import { GameApi, PvpGameApi } from '@codecharacter-2024/client';
import { GameType } from '../editor/code';

export const getLogs = (id: string, gametype: GameType): Promise<string> => {
  return new Promise((resolve, reject) => {
    const gameAPI = new GameApi(apiConfig);
    const pvpGameApi = new PvpGameApi(apiConfig);
    if (gametype === GameType.NORMAL) {
      gameAPI
        .getGameLogsByGameId(id)
        .then(logs => {
          resolve(logs);
        })
        .catch(error => {
          if (error instanceof ApiError) {
            reject();
          }
        });
    } else {
      pvpGameApi
        .getPvpGameLogsByGameId(id)
        .then(logs => {
          resolve(logs);
        })
        .catch(error => {
          if (error instanceof ApiError) {
            reject();
          }
        });
    }
  });
};
