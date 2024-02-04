import * as LeaderboardType from './LeaderboardTypes';
import { useEffect, useState } from 'react';
import { Modal, Button, Table, Dropdown } from 'react-bootstrap';
import { useAppSelector } from '../../store/hooks';
import styles from './Leaderboard.module.css';
import { getAvatarByID } from '../Avatar/Avatar';
import {
  LeaderboardApi,
  MatchApi,
  LeaderboardEntry,
  MatchMode,
  TierType,
  PvPLeaderBoardResponse,
  DailyChallengeLeaderBoardResponse,
  DailyChallengesApi,
} from '@codecharacter-2024/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Loader from '../Loader/Loader';
import swordImage from '../../assets/sword.png';
import Toast from 'react-hot-toast';
import { user } from '../../store/User/UserSlice';

function PaginatedItems(props: LeaderboardType.Props) {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<LeaderboardEntry[]>([]);
  const [nextItems, setNextItems] = useState<LeaderboardEntry[]>([]);
  const [pvpItems, setPvpItems] = useState<PvPLeaderBoardResponse[]>([]);
  const [pvpNextItems, setPvpNextItems] = useState<PvPLeaderBoardResponse[]>(
    [],
  );
  const [dcItems, setDcItems] = useState<DailyChallengeLeaderBoardResponse[]>(
    [],
  );
  const [dcNextItems, setDcNextItems] = useState<
    DailyChallengeLeaderBoardResponse[]
  >([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPvPLoaded, setIsPvPLoaded] = useState(false);
  const [isDcLoaded, setIsDcLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [currentOpponentUsername, setCurrentOpponentUsername] = useState('');
  const [activeTier, setActiveTier] = useState<TierType | undefined>(undefined);

  const handleClose = () => setShow(false);
  const handleShow = (username: string) => {
    setCurrentOpponentUsername(username);
    setShow(true);
  };

  const itemsPerPage = 8;
  const currentUserName = useAppSelector(user).username;

  const leaderboardAPI = new LeaderboardApi(apiConfig);

  switch (props.page) {
    case 'PvP':
      useEffect(() => {
        fetchPvPLeaderboard(page);
      }, [page]);
      useEffect(() => {
        checkPvPEmpty();
      }, [pvpNextItems]);
      break;
    case 'DailyChallenge':
      useEffect(() => {
        fetchDcLeaderboard(page);
      }, [page]);
      useEffect(() => {
        checkDcEmpty();
      }, [dcNextItems]);
      break;
    default:
      useEffect(() => {
        fetchLeaderboardByTier(page, activeTier);
      }, [page]);
      useEffect(() => {
        checkEmpty();
      }, [nextItems]);
  }

  function checkEmpty() {
    let emptylistBool = false;
    if (nextItems.length == 0) {
      emptylistBool = true;
    }
    return emptylistBool;
  }

  function checkPvPEmpty() {
    let emptylistBool = false;
    if (pvpNextItems.length == 0) {
      emptylistBool = true;
    }
    return emptylistBool;
  }

  function checkDcEmpty() {
    let emptylistBool = false;
    if (dcNextItems.length == 0) {
      emptylistBool = true;
    }
    return emptylistBool;
  }

  const fetchLeaderboardByTier = (pageNum: number, tier?: TierType) => {
    setIsLoaded(false);
    leaderboardAPI
      .getLeaderboard(pageNum, itemsPerPage, tier)
      .then(response => {
        setItems(response);
        setIsLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    leaderboardAPI
      .getLeaderboard(pageNum + 1, itemsPerPage, tier)
      .then(response => {
        setNextItems(response);
        setIsLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
  };

  const fetchPvPLeaderboard = (pageNum: number) => {
    setIsPvPLoaded(false);
    leaderboardAPI
      .getPvPLeaderboard(pageNum, itemsPerPage)
      .then(response => {
        setPvpItems(response);
        setIsPvPLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    leaderboardAPI
      .getPvPLeaderboard(pageNum + 1, itemsPerPage)
      .then(response => {
        setPvpNextItems(response);
        setIsPvPLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
  };

  const fetchDcLeaderboard = (pageNum: number) => {
    setIsDcLoaded(false);
    const DcApi = new DailyChallengesApi(apiConfig);
    DcApi.getDailyChallengeLeaderBoard(pageNum, itemsPerPage)
      .then(response => {
        setDcItems(response);
        setIsDcLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    DcApi.getDailyChallengeLeaderBoard(pageNum + 1, itemsPerPage)
      .then(response => {
        setDcNextItems(response);
        setIsLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
  };

  async function handleMatchStart() {
    const matchAPI = new MatchApi(apiConfig);
    matchAPI
      .createMatch({
        mode: MatchMode.Manual,
        opponentUsername: currentOpponentUsername,
        codeRevisionId: undefined,
        mapRevisionId: undefined,
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    setShow(false);
  }
  async function handlePvPMatchStart() {
    const matchAPI = new MatchApi(apiConfig);
    matchAPI
      .createMatch({
        mode: MatchMode.Pvp,
        opponentUsername: currentOpponentUsername,
        codeRevisionId: undefined,
        codeRevisionId2: undefined,
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    setShow(false);
  }
  return (
    <>
      <>
        {props.page == 'Normal' ? (
          !isLoaded ? (
            <Loader />
          ) : (
            <>
              <div className={styles.list}>
                <Modal
                  show={show}
                  onHide={handleClose}
                  contentClassName={styles.content}
                >
                  <Modal.Header className={styles.matchHeader}>
                    <Modal.Title className={styles.headerText}>
                      Start a new match
                    </Modal.Title>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      aria-label="Close"
                      onClick={handleClose}
                    ></button>
                  </Modal.Header>
                  <Modal.Body className={styles.matchBody}>
                    Do you want to start a match against{' '}
                    {currentOpponentUsername}?
                  </Modal.Body>
                  <Modal.Footer className={styles.matchFooter}>
                    <Button
                      className={styles.matchModalBtn}
                      variant="outline-light"
                      size="lg"
                      onClick={() => handleMatchStart()}
                    >
                      Start match
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Table hover className={styles.list} responsive>
                  <thead>
                    <tr className={styles.tableHeader}>
                      <th className={styles.tableHeader}>RANK</th>
                      <th className={styles.tableHeader}>USERNAME</th>
                      <th className={styles.tableHeader}>RATINGS</th>
                      <th className={styles.tableHeader}></th>
                      <th className={styles.tableHeader}>WON</th>
                      <th className={styles.tableHeader}>LOST</th>
                      <th className={styles.tableHeader}>TIED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items &&
                      items.map((row: LeaderboardEntry) => (
                        <tr
                          className={
                            styles.item +
                            ' ' +
                            (currentUserName === row.user.username
                              ? styles.currentUserItem
                              : '')
                          }
                          key={row.user.username}
                        >
                          <td className={styles.pos}>
                            {items.indexOf(row) + 1 + page * itemsPerPage}
                          </td>
                          <td className={styles.name}>
                            <div>
                              <img
                                className={styles.pic}
                                src={getAvatarByID(row.user.avatarId).url}
                              ></img>
                              <span className={styles.namespan}>
                                {' ' + row.user.username.substring(0, 10)}
                              </span>
                            </div>
                          </td>
                          <td className={styles.score}>
                            {row.stats.rating.toFixed(3)}
                          </td>
                          {currentUserName === row.user.username ? (
                            <td className={styles.score}>---</td>
                          ) : (
                            <td
                              className={styles.attackButton}
                              onClick={() => handleShow(row.user.username)}
                            >
                              <img
                                className={styles.attackImg}
                                src={swordImage}
                              ></img>
                            </td>
                          )}
                          <td className={styles.score}>{row.stats.wins}</td>
                          <td className={styles.score}>{row.stats.losses}</td>
                          <td className={styles.score}>{row.stats.ties}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </>
          )
        ) : props.page == 'PvP' ? (
          !isPvPLoaded ? (
            <Loader />
          ) : (
            <>
              <div className={styles.list}>
                <Modal
                  show={show}
                  onHide={handleClose}
                  contentClassName={styles.content}
                >
                  <Modal.Header className={styles.matchHeader}>
                    <Modal.Title className={styles.headerText}>
                      Start a new PvP match
                    </Modal.Title>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      aria-label="Close"
                      onClick={handleClose}
                    ></button>
                  </Modal.Header>
                  <Modal.Body className={styles.matchBody}>
                    Do you want to start a PvP match against{' '}
                    {currentOpponentUsername}?
                  </Modal.Body>
                  <Modal.Footer className={styles.matchFooter}>
                    <Button
                      className={styles.matchModalBtn}
                      variant="outline-light"
                      size="lg"
                      onClick={() => handlePvPMatchStart()}
                    >
                      Start match
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Table hover className={styles.list} responsive>
                  <thead>
                    <tr className={styles.tableHeader}>
                      <th className={styles.tableHeader}>RANK</th>
                      <th className={styles.tableHeader}>USERNAME</th>
                      <th className={styles.tableHeader}>RATINGS</th>
                      <th className={styles.tableHeader}></th>
                      <th className={styles.tableHeader}>WON</th>
                      <th className={styles.tableHeader}>LOST</th>
                      <th className={styles.tableHeader}>TIED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items &&
                      items.map((row: PvPLeaderBoardResponse) => (
                        <tr
                          className={
                            styles.item +
                            ' ' +
                            (currentUserName === row.user.username
                              ? styles.currentUserItem
                              : '')
                          }
                          key={row.user.username}
                        >
                          <td className={styles.pos}>
                            {pvpItems.indexOf(row) + 1 + page * itemsPerPage}
                          </td>
                          <td className={styles.name}>
                            <div>
                              <img
                                className={styles.pic}
                                src={getAvatarByID(row.user.avatarId).url}
                              ></img>
                              <span className={styles.namespan}>
                                {' ' + row.user.username.substring(0, 10)}
                              </span>
                            </div>
                          </td>
                          <td className={styles.score}>
                            {row.stats.rating.toFixed(3)}
                          </td>
                          {currentUserName === row.user.username ? (
                            <td className={styles.score}>---</td>
                          ) : (
                            <td
                              className={styles.attackButton}
                              onClick={() => handleShow(row.user.username)}
                            >
                              <img
                                className={styles.attackImg}
                                src={swordImage}
                              ></img>
                            </td>
                          )}
                          <td className={styles.score}>{row.stats.wins}</td>
                          <td className={styles.score}>{row.stats.losses}</td>
                          <td className={styles.score}>{row.stats.ties}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </>
          )
        ) : !isDcLoaded ? (
          <Loader />
        ) : (
          <>
            <div className={styles.list}>
              <Table hover className={styles.list} responsive>
                <thead>
                  <tr className={styles.tableHeader}>
                    <th className={styles.tableHeader}>RANK</th>
                    <th className={styles.tableHeader}>USERNAME</th>
                    <th className={styles.tableHeader}>SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  {dcItems &&
                    dcItems.map((row: DailyChallengeLeaderBoardResponse) => (
                      <tr
                        className={
                          styles.item +
                          ' ' +
                          (currentUserName === row.userName
                            ? styles.currentUserItem
                            : '')
                        }
                        key={row.userName}
                      >
                        <td className={styles.pos}>
                          {dcItems.indexOf(row) + 1 + page * itemsPerPage}
                        </td>
                        <td className={styles.name}>
                          <div>
                            <img
                              className={styles.pic}
                              src={getAvatarByID(row.avatarId).url}
                            ></img>
                            {' ' + row.userName.substring(0, 10)}
                          </div>
                        </td>
                        <td className={styles.score}>{row.score.toFixed(2)}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </>
      <nav className={styles.paginationouter}>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            if (page !== 0) {
              setPage(prevPage => prevPage - 1);
            }
          }}
        >
          {'<'}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            if (!checkEmpty()) {
              setPage(prevPage => prevPage + 1);
            } else {
              Toast("You're at the last page");
            }
          }}
        >
          {'>'}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            fetchLeaderboardByTier(0, activeTier);
            setPage(0);
          }}
          id="refresh"
        >
          Refresh
        </button>
        {props.page == 'Normal' ? (
          <Dropdown id="tiers">
            <Dropdown.Toggle variant="dark" className={styles.button}>
              {activeTier?.toString() || 'All Tiers'}
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.menuBackground}>
              <Dropdown.Item
                className={styles.menuText}
                onClick={() => {
                  setActiveTier(undefined);
                  fetchLeaderboardByTier(0);
                  setPage(0);
                }}
              >
                All Tiers
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.menuText}
                onClick={() => {
                  setActiveTier(TierType.Tier1);
                  fetchLeaderboardByTier(0, TierType.Tier1);
                  setPage(0);
                }}
              >
                Tier 1
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.menuText}
                onClick={() => {
                  setActiveTier(TierType.Tier2);
                  fetchLeaderboardByTier(0, TierType.Tier2);
                  setPage(0);
                }}
              >
                Tier 2
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}

export default function Leaderboard(props: LeaderboardType.Props): JSX.Element {
  return (
    <div className={styles.body}>
      <div className={styles.ranklist}>
        <PaginatedItems page={props.page} />
      </div>
    </div>
  );
}
