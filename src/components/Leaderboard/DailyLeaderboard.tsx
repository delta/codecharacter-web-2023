import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAppSelector } from '../../store/hooks';
import styles from './Leaderboard.module.css';
import { getAvatarByID } from '../Avatar/Avatar';
import {
  DailyChallengeLeaderBoardResponse,
  DailyChallengesApi,
} from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Loader from '../Loader/Loader';
import Toast from 'react-hot-toast';
import { user } from '../../store/User/UserSlice';

function PaginatedItems() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<DailyChallengeLeaderBoardResponse[]>([]);
  const [nextItems, setNextItems] = useState<
    DailyChallengeLeaderBoardResponse[]
  >([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const itemsPerPage = 8;
  const currentUserName = useAppSelector(user).username;

  useEffect(() => {
    fetchLeaderboard(page);
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

  const fetchLeaderboard = (pageNum: number) => {
    setIsLoaded(false);
    const leaderboardAPI = new DailyChallengesApi(apiConfig);
    leaderboardAPI
      .getDailyChallengeLeaderBoard(pageNum, itemsPerPage)
      .then(response => {
        setItems(response);
        setIsLoaded(true);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    leaderboardAPI
      .getDailyChallengeLeaderBoard(pageNum + 1, itemsPerPage)
      .then(response => {
        setNextItems(response);
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
  };

  return (
    <>
      <>
        {!isLoaded ? (
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
                  {items &&
                    items.map((row: DailyChallengeLeaderBoardResponse) => (
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
                          {items.indexOf(row) + 1 + page * itemsPerPage}
                        </td>
                        <td className={styles.name}>
                          <div>
                            <img
                              className={styles.pic}
                              src={getAvatarByID(row.avatarId).url}
                            ></img>
                            {' ' + row.userName}
                          </div>
                        </td>
                        <td className={styles.score}>{row.score}</td>
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
            setPage(0);
          }}
        >
          Refresh
        </button>
      </nav>
    </>
  );
}

export default function DailyChallengeLeaderboard(): JSX.Element {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          <span>Daily Challenge Leaderboard</span>
        </h1>
      </div>
      <div className={styles.ranklist}>
        <PaginatedItems />
      </div>
    </div>
  );
}
