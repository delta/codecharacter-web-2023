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

  const handleClose = () => setShow(false);
  const handleShow = (username: string) => {
    setCurrentOpponentUsername(username);
    setShow(true);
  };

  const tier1Index = 1;
  const tier2Index = 3;
  const tier3Index = 6;
  const tier4Index = 9;
  const tierMax = 15;
  const [tierOffest, setTierOffset] = useState(0);

  const itemsPerPage = 8;
  const currentUserName = useAppSelector(user).username;

  useEffect(() => {
    fetchLeaderboard(page);
    setTierOffset(0);
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

  function getTier(pos: number) {
    if (pos > tier4Index && pos < tierMax) {
      return styles.tier3;
    } else if (pos < tier4Index + 1 && pos > tier3Index) {
      return styles.tier2;
    } else if (pos < tier3Index + 1 && pos > tier2Index) {
      return styles.tier1;
    } else if (pos < tier2Index + 1 && pos > tier1Index - 1) {
      return styles.tier0;
    } else {
      return '';
    }
  }

  const fetchLeaderboard = (pageNum: number) => {
    setIsLoaded(false);
    const leaderboardAPI = new LeaderboardApi(apiConfig);
    leaderboardAPI
      .getLeaderboard(pageNum, itemsPerPage)
      .then(response => {
        setItems(response);
        console.log(items);
        setIsLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    leaderboardAPI
      .getLeaderboard(pageNum + 1, itemsPerPage)
      .then(response => {
        setNextItems(response);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    leaderboardAPI
      .getLeaderboard(pageNum + 1, itemsPerPage)
      .then(response => {
        setNextItems(response);
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
        if (error instanceof ApiError) console.log(error);
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
              <Modal show={show} onHide={handleClose}>
                <Modal.Header className={styles.matchHeader} closeButton>
                  <Modal.Title>Start a new match</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.matchBody}>
                  Do you want to start a match against {currentOpponentUsername}
                  ?
                </Modal.Body>
                <Modal.Footer className={styles.matchFooter}>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    className={styles.matchButton}
                    onClick={() => handleMatchStart()}
                  >
                    Start mat border: 1px;ch
                  </Button>
                </Modal.Footer>
              </Modal>
              <Table hover className={styles.list} responsive>
                <thead>
                  <tr className={styles.tableHeader}>
                    <th className={styles.tierheader}></th>
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
                        <td
                          className={getTier(
                            items.indexOf(row) +
                              1 +
                              tierOffest +
                              page * itemsPerPage,
                          )}
                        ></td>
                        <td className={styles.pos}>
                          {items.indexOf(row) +
                            1 +
                            tierOffest +
                            page * itemsPerPage}
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
            if (page == 0) {
              Toast('First Page');
            } else {
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
              Toast('This is the last page');
            }
          }}
        >
          {'>'}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            fetchLeaderboard(0);
            setTierOffset(0);
            setPage(0);
          }}
        >
          Refresh
        </button>
        <Dropdown>
          <Dropdown.Toggle className={styles.button}>
            Filter by Tier
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Tier 1</Dropdown.Item>
            <Dropdown.Item>Tier 2</Dropdown.Item>
            <Dropdown.Item>Tier 3</Dropdown.Item>
            <Dropdown.Item>Tier 4</Dropdown.Item>
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
          <span>Leaderboard</span>
        </h1>
      </div>
      <div className={styles.ranklist}>
        <PaginatedItems />
      </div>
    </div>
  );
}
