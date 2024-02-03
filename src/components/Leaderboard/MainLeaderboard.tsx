import { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Leaderboard from './Leaderboard';
import styles from './Leaderboard.module.css';
import { CurrentUserApi } from '@codecharacter-2024/client';
import { useTour } from '@reactour/tour';
import { apiConfig } from '../../api/ApiConfig';
import { dcEnable } from '../../config/config';

export default function BattleTV(): JSX.Element {
  const [leaderboardType, setLeaderboardType] = useState('Normal Leaderboard');
  const [SelectedButton, setSelectedButton] = useState('Normal');

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
      {dcEnable ? (
        <div className={styles.buttonContainer}>
          <div className={styles.codeMapButton}>
            <ButtonGroup id="LeaderboardTypeSelector">
              <Button
                className={
                  SelectedButton == 'Normal'
                    ? styles.whiteButton
                    : styles.darkButton
                }
                onClick={() => {
                  setSelectedButton('Normal');
                  setLeaderboardType('Normal Leaderboard');
                }}
                variant="outline-light"
              >
                Normal
              </Button>
              <Button
                variant="outline-light"
                className={
                  SelectedButton == 'PvP'
                    ? styles.whiteButton
                    : styles.darkButton
                }
                onClick={() => {
                  setSelectedButton('PvP');
                  setLeaderboardType('PvP Leaderboard');
                }}
              >
                PvP
              </Button>
              <Button
                variant="outline-light"
                className={
                  SelectedButton == 'DC'
                    ? styles.whiteButton
                    : styles.darkButton
                }
                onClick={() => {
                  setSelectedButton('DC');
                  setLeaderboardType('Daily Challenge Leaderboard');
                }}
              >
                Daily Challenges
              </Button>
            </ButtonGroup>
          </div>
        </div>
      ) : (
        <div className={styles.buttonContainer}>
          <div className={styles.codeMapButton}>
            <ButtonGroup id="LeaderboardTypeSelector">
              <Button
                className={
                  SelectedButton == 'Normal'
                    ? styles.whiteButton
                    : styles.darkButton
                }
                onClick={() => {
                  setSelectedButton('Normal');
                  setLeaderboardType('Normal Leaderboard');
                }}
                variant="outline-light"
              >
                Normal
              </Button>
              <Button
                variant="outline-light"
                className={
                  SelectedButton == 'PvP'
                    ? styles.whiteButton
                    : styles.darkButton
                }
                onClick={() => {
                  setSelectedButton('PvP');
                  setLeaderboardType('PvP Leaderboard');
                }}
              >
                PvP
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
      {leaderboardType == 'Daily Challenge Leaderboard' ? (
        <Leaderboard page={'DailyChallenge'} key={leaderboardType} />
      ) : leaderboardType == 'PvP Leaderboard' ? (
        <Leaderboard page={'PvP'} key={leaderboardType} />
      ) : (
        <Leaderboard page={'Normal'} key={leaderboardType} />
      )}
    </div>
  );
}
