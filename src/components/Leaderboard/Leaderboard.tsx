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
} from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Loader from '../Loader/Loader';
import swordImage from '../../assets/sword.png';
import Toast from 'react-hot-toast';
import { user } from '../../store/User/UserSlice';

function PaginatedItems() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<LeaderboardEntry[]>([]);
  const [nextItems, setNextItems] = useState<LeaderboardEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    fetchLeaderboardByTier(page, activeTier);
  }, [page]);

  useEffect(() => {
    checkEmpty();
  }, [nextItems]);

  function checkEmpty() {
    let emptylistBool = false;
    if (nextItems.length == 0) {
      emptylistBool = true;
    }
    return emptylistBool;
  }

  const fetchLeaderboardByTier = (pageNum: number, tier?: TierType) => {
    setIsLoaded(false);
    const leaderboardAPI = new LeaderboardApi(apiConfig);
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
  return (
    <>
      <>
        {!isLoaded ? (
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
                  Do you want to start a match against {currentOpponentUsername}
                  ?
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
                            {' ' + row.user.username}
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
              }}
            >
              All Tiers
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.menuText}
              onClick={() => {
                setActiveTier(TierType.Tier1);
                fetchLeaderboardByTier(0, TierType.Tier1);
              }}
            >
              Tier 1
            </Dropdown.Item>
            <Dropdown.Item
              className={styles.menuText}
              onClick={() => {
                setActiveTier(TierType.Tier2);
                fetchLeaderboardByTier(0, TierType.Tier2);
              }}
            >
              Tier 2
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </>
  );
}

export default function Leaderboard(): JSX.Element {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          <span>Match Leaderboard</span>
        </h1>
      </div>
      <div className={styles.ranklist}>
        <PaginatedItems />
      </div>
    </div>
  );
}
