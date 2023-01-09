import { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Table,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
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
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState<LeaderboardEntry[]>([]);
  const [usableItems, setUsableItems] = useState<LeaderboardEntry[]>([]);
  const [currentItems, setCurrentItems] = useState<LeaderboardEntry[]>([]);
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
    fetchLeaderboard(0, 10000);
    console.log('I was called');
    setTierOffset(0);
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(usableItems.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(usableItems.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, usableItems]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  function getTierOffset(tier: number) {
    if (tier == 4) {
      setTierOffset(tier4Index);
    } else if (tier == 3) {
      setTierOffset(tier3Index);
    } else if (tier == 2) {
      setTierOffset(tier2Index);
    } else if (tier == 1) {
      setTierOffset(tier1Index - 1);
    }
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

  const fetchLeaderboard = (startIndex: number, endIndex: number) => {
    setIsLoaded(false);
    const leaderboardAPI = new LeaderboardApi(apiConfig);
    leaderboardAPI
      .getLeaderboard(0, 10000) // The pagination system is so messed up, I can't be bother to fix it, so this hack
      .then(response => {
        setItems(response);
        console.log(items);
        setIsLoaded(true);
        setUsableItems(items.slice(startIndex, endIndex));
        console.log(usableItems);
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
                    <th className={styles.tableHeader} colSpan={2}>
                      USERNAME
                    </th>
                    <th className={styles.tableHeader}>RATINGS</th>
                    <th className={styles.tableHeader}></th>
                    <th className={styles.tableHeader}>WON</th>
                    <th className={styles.tableHeader}>TIED</th>
                    <th className={styles.tableHeader}>LOST</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map((row: LeaderboardEntry) => (
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
                            usableItems.indexOf(row) + 1 + tierOffest,
                          )}
                        ></td>
                        <td className={styles.pos}>
                          {usableItems.indexOf(row) + 1 + tierOffest}
                        </td>
                        <td className={styles.score}>
                          <img
                            className={styles.pic}
                            src={getAvatarByID(row.user.avatarId).url}
                          ></img>
                        </td>
                        <td className={styles.name}>{row.user.username}</td>
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
                        <td className={styles.score}>{row.stats.ties}</td>
                        <td className={styles.score}>{row.stats.losses}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </>
      <nav className={styles.paginationouter}>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageLinkClassName={styles.pageNum}
          previousLinkClassName={styles.pageNum}
          nextLinkClassName={styles.pageNum}
          breakLabel="..."
          breakClassName={styles.break}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeLinkClassName={styles.active}
        />
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            fetchLeaderboard(0, 10000);
            setTierOffset(0);
          }}
        >
          Refresh
        </button>
        <DropdownButton key="up" title="Filter By Tier" id="dropdown">
          <Dropdown.Item
            onClick={() => {
              fetchLeaderboard(tier1Index - 1, tier2Index);
              getTierOffset(1);
            }}
          >
            Tier 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              fetchLeaderboard(tier2Index, tier3Index);
              getTierOffset(2);
            }}
          >
            Tier 2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              fetchLeaderboard(tier3Index, tier4Index);
              getTierOffset(3);
            }}
          >
            Tier 3
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              fetchLeaderboard(tier4Index, tierMax);
              getTierOffset(4);
            }}
          >
            Tier 4
          </Dropdown.Item>
        </DropdownButton>
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
