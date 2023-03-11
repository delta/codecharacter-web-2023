import { useEffect, useState } from 'react';
import DailyChallengeLeaderboard from './DailyLeaderboard';
import Leaderboard from './Leaderboard';
import styles from './Leaderboard.module.css';
import { CurrentUserApi } from '@codecharacter-2023/client';
import { useTour } from '@reactour/tour';
import { apiConfig } from '../../api/ApiConfig';
import { dcEnable } from '../../config/config';

export default function BattleTV(): JSX.Element {
  const [isDailyChallengeLeaderboard, setIsDailyChallengeLeaderboard] =
    useState(false);
  const [leaderboardType, setLeaderboardType] = useState(
    'Daily Challenge Leaderboard',
  );

  const { setIsOpen } = useTour();

  const currentUserapi = new CurrentUserApi(apiConfig);

  useEffect(() => {
    setTimeout(() => {
      currentUserapi.getCurrentUser().then(response => {
        if (
          response.isTutorialComplete === false &&
          response.tutorialLevel == 3
        ) {
          setIsOpen(true);
        }
      });
    }, 200);
  }, []);
  return (
    <div className={styles.mainleaderboard} id="LeaderBoard">
      {isDailyChallengeLeaderboard ? (
        <DailyChallengeLeaderboard />
      ) : (
        <Leaderboard />
      )}
      {dcEnable ? (
        <></>
      ) : (
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            if (!isDailyChallengeLeaderboard) {
              setIsDailyChallengeLeaderboard(true);
              setLeaderboardType('Match Leaderboard');
            } else {
              setIsDailyChallengeLeaderboard(false);
              setLeaderboardType('Daily Challenge Leaderboard');
            }
          }}
        >
          {leaderboardType}
        </button>
      )}
    </div>
  );
}
