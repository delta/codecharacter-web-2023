import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getLogAction } from '../../store/rendererLogs/logSlice';
import { useNavigate } from 'react-router-dom';
import styles from './BattleTV.module.css';
import {
  normalBattleTvSelector,
  pvpBattleTvSelector,
  dcBattleTvSelector,
  fetchBattlesAction,
  BattleType,
  loadingSelector,
  hasErrorsSelector,
} from '../../store/BattleTV/BattleTvSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getAvatarByID } from '../Avatar/Avatar';
import {
  CurrentUserApi,
  Game,
  Match,
  MatchMode,
  PvPGame,
  PvPMatch,
  Verdict,
} from '@codecharacter-2024/client';
import { User, user } from '../../store/User/UserSlice';
import {
  changePageState,
  changeSimulationState,
} from '../../store/DailyChallenge/dailyChallenge';
import watchIcon from '../../assets/watch.png';
import { useTour } from '@reactour/tour';
import { apiConfig } from '../../api/ApiConfig';
import codecharacterIcon from '../../../public/assets/codechar_favicon.png';
import { Button, ButtonGroup } from 'react-bootstrap';
import { GameType } from '../../store/editor/code';

interface MatchType {
  Match: Match;
  PvPMatch: PvPMatch;
}

function getIcon(loggedInUser: User, match: MatchType[keyof MatchType]) {
  if (loggedInUser.username === match.user1.username) {
    // user is PLAYER1
    if (match.matchVerdict === Verdict.Player1) {
      return styles.battlecardwin;
    } else if (match.matchVerdict == Verdict.Player2) {
      return styles.battlecardlose;
    } else if (match.matchVerdict == Verdict.Success) {
      return styles.battlecardwin;
    } else if (match.matchVerdict == Verdict.Failure) {
      return styles.battlecardlose;
    }
  } else {
    // user is PLAYER2
    if (match.matchVerdict === Verdict.Player1) {
      return styles.battlecardlose;
    } else if (match.matchVerdict == Verdict.Player2) {
      return styles.battlecardwin;
    }
  }
  return styles.battlecardtie;
}

function getMatchMode(match: Match | PvPMatch) {
  let style = '';
  if (match.matchMode == MatchMode.Auto) {
    style = styles.automatch;
  }
  return style;
}

function getUsersGame(
  loggedInUser: User,
  match: MatchType[keyof MatchType],
): Game | PvPGame {
  if ('games' in match) {
    const games = [...match.games.values()];
    if (loggedInUser.username == match.user1.username) {
      return games[0];
    } else {
      return games[games.length - 1];
    }
  } else {
    return match.game;
  }
}

function PaginatedItems({ battleTvType }: { battleTvType: BattleType }) {
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();
  const currentBattles =
    battleTvType == BattleType.PVP
      ? useAppSelector(pvpBattleTvSelector)
      : battleTvType == BattleType.NORMAL
      ? useAppSelector(normalBattleTvSelector)
      : useAppSelector(dcBattleTvSelector);
  const loading = useAppSelector(loadingSelector);
  const loggedInUser = useAppSelector(user);
  const hasErrors = useAppSelector(hasErrorsSelector);

  // initialize the redux hook
  const dispatch = useAppDispatch();

  if (!currentBattles.hasbeenFetched) {
    if (currentBattles.page !== pageCount) {
      dispatch(
        fetchBattlesAction({ battleTvType: battleTvType, page: pageCount }),
      );
    }
  }

  const handlePageClick = (event: { selected: number }) => {
    setPageCount(event.selected);
    dispatch(
      fetchBattlesAction({ battleTvType: battleTvType, page: event.selected }),
    );
    console.log('changed');
  };

  return (
    <>
      <>
        {loading || hasErrors ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-white" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {currentBattles.battles.length == 0 ? (
              <div className={styles.message}>
                You have not played any matches yet
              </div>
            ) : (
              currentBattles.battles &&
              currentBattles.battles.map(
                (match: MatchType[keyof MatchType]) => (
                  <div className={styles.item} key={match.id}>
                    <div
                      className={
                        styles.item +
                        ' ' +
                        getIcon(loggedInUser, match) +
                        ' ' +
                        getMatchMode(match)
                      }
                    >
                      <span className={styles.username}>
                        <div className={styles.picholder}>
                          <img
                            src={getAvatarByID(match.user1.avatarId).url}
                            className={styles.pic}
                          ></img>
                        </div>
                        <span className={[styles.name].join(' ')}>
                          {match.user1.username.substring(0, 10)}
                        </span>
                      </span>
                      <span className={styles.coinsusedleft}>
                        {'game' in match
                          ? match.game.scorePlayer1
                          : [...match.games.values()][0].coinsUsed}
                      </span>
                      <span className={styles.scoreleft}>
                        {'game' in match
                          ? '----'
                          : [...match.games.values()][0].destruction.toFixed(2)}
                      </span>
                      <div
                        className={styles.watchButton}
                        onClick={() => {
                          dispatch(
                            getLogAction({
                              //needs to be changed
                              id:
                                battleTvType === BattleType.PVP
                                  ? match.id
                                  : getUsersGame(loggedInUser, match).id,
                              callback: () => {
                                if (match.user2 === null) {
                                  dispatch(changePageState('DailyChallenge'));
                                  dispatch(changeSimulationState(true));
                                }
                                navigate('/dashboard');
                              },
                              gameType:
                                battleTvType == BattleType.PVP
                                  ? GameType.PVP
                                  : GameType.NORMAL,
                            }),
                          );
                        }}
                      >
                        <img src={watchIcon}></img>
                      </div>
                      <span className={styles.scoreright}>
                        {'game' in match
                          ? match.game.scorePlayer2
                          : [...match.games.values()][
                              [...match.games.values()].length === 1 ? 0 : 1
                            ].destruction.toFixed(2)}
                      </span>
                      <span className={styles.coinsusedright}>
                        {'game' in match
                          ? '----'
                          : [...match.games.values()][
                              [...match.games.values()].length === 1 ? 0 : 1
                            ].coinsUsed}
                      </span>
                      <span className={styles.username}>
                        <span className={[styles.name, styles.right].join(' ')}>
                          {match.user2 !== null
                            ? match.user2?.username
                            : 'Daily Challenge'}
                        </span>
                        <div className={styles.picholder}>
                          <img
                            src={
                              match.user2 == null
                                ? codecharacterIcon
                                : getAvatarByID(match.user2?.avatarId as number)
                                    .url
                            }
                            className={styles.pic}
                          ></img>
                        </div>
                      </span>
                    </div>
                  </div>
                ),
              )
            )}
          </>
        )}
      </>
      <nav className={styles.paginationouter}>
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageLinkClassName={styles.pageNum}
          previousLinkClassName={styles.pageNum}
          nextLinkClassName={styles.pageNum}
          breakLabel="..."
          breakLinkClassName={styles.pageNum}
          pageCount={69}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName="active"
        />
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            dispatch(
              fetchBattlesAction({ battleTvType: battleTvType, page: 0 }),
            );
          }}
          id="refresh"
        >
          Refresh
        </button>
      </nav>
    </>
  );
}
export default function BattleTV(): JSX.Element {
  const { setIsOpen } = useTour();
  const currentUserapi = new CurrentUserApi(apiConfig);
  const [battleTvType, setBattleTvType] = useState<BattleType>(
    BattleType.NORMAL,
  );

  useEffect(() => {
    setTimeout(() => {
      currentUserapi.getCurrentUser().then(response => {
        if (
          response.isTutorialComplete === false &&
          response.tutorialLevel == 5
        ) {
          setIsOpen(true);
        }
      });
    }, 200);
  }, []);

  return (
    <div className={styles.body} id="battleTV">
      <div className={styles.buttonContainer}>
        <div className={styles.codeMapButton}>
          <ButtonGroup id="BattleTvTypeSelector">
            <Button
              className={
                battleTvType == BattleType.NORMAL
                  ? styles.whiteButton
                  : styles.darkButton
              }
              onClick={() => {
                setBattleTvType(BattleType.NORMAL);
              }}
              variant="outline-light"
            >
              Normal
            </Button>
            <Button
              variant="outline-light"
              className={
                battleTvType == BattleType.PVP
                  ? styles.whiteButton
                  : styles.darkButton
              }
              onClick={() => {
                setBattleTvType(BattleType.PVP);
              }}
            >
              PvP
            </Button>
            <Button
              variant="outline-light"
              className={
                battleTvType == BattleType.DC
                  ? styles.whiteButton
                  : styles.darkButton
              }
              onClick={() => {
                setBattleTvType(BattleType.DC);
              }}
            >
              Daily Challenge
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className={styles.ranklist}>
        {battleTvType !== BattleType.PVP ? (
          <div className={styles.tableheaderdiv}>
            <span className={styles.tableheader}>ATTACKER</span>
            <span className={styles.tableheader}>COINS USED</span>
            <span className={styles.tableheader}>DESTRUCTION(%)</span>
            <span className={styles.tableheader}></span>
            <span className={styles.tableheader}>DESTRUCTION(%)</span>
            <span className={styles.tableheader}>COINS USED</span>
            <span className={styles.tableheader}>DEFENDER</span>
          </div>
        ) : (
          <div className={styles.tableheaderdiv}>
            <span className={styles.tableheader}>PLAYER 1</span>
            <span className={styles.tableheader}>SCORE</span>
            <span className={styles.tableheader}></span>
            <span className={styles.tableheader}>SCORE</span>
            <span className={styles.tableheader}>PLAYER 2</span>
          </div>
        )}
        <PaginatedItems battleTvType={battleTvType} />
      </div>
    </div>
  );
}
