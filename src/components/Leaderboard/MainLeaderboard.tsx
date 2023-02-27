import { useState } from 'react';
import DailyChallengeLeaderboard from './DailyLeaderboard';
import Leaderboard from './Leaderboard';
import styles from './Leaderboard.module.css';

export default function BattleTV(): JSX.Element {
  const [isDailyChallengeLeaderboard, setIsDailyChallengeLeaderboard] =
    useState(false);
  const [leaderboardType, setLeaderboardType] = useState(
    'Daily Challenge Leaderboard',
  );

  return (
    <div className={styles.mainleaderboard}>
      {isDailyChallengeLeaderboard ? (
        <DailyChallengeLeaderboard />
      ) : (
        <Leaderboard />
      )}
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
    </div>
  );
}
