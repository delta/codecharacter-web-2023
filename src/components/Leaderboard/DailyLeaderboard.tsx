import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useAppSelector } from '../../store/hooks';
import styles from './Leaderboard.module.css';
import {
  DailyChallengesApi,
  DailyChallengeLeaderBoardResponse,
} from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Loader from '../Loader/Loader';
import trophyImage from '../../assets/trophy.png';
import Toast from 'react-hot-toast';
import { user } from '../../store/User/UserSlice';
import { Table } from 'react-bootstrap';

function PaginatedItems() {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState<DailyChallengeLeaderBoardResponse[]>([]);
  const [currentItems, setCurrentItems] = useState<
    DailyChallengeLeaderBoardResponse[]
  >([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const itemsPerPage = 10;
  const currentUserName = useAppSelector(user).username;

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const fetchLeaderboard = () => {
    setIsLoaded(false);
    const leaderboardAPI = new DailyChallengesApi(apiConfig);
    leaderboardAPI
      .getDailyChallengeLeaderBoard() // The pagination system is so messed up, I can't be bother to fix it, so this hack
      .then(response => {
        setItems(response);
        setIsLoaded(true);
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
                    <th className={styles.tableHeader}>USERNAME</th>
                    <th className={styles.tableHeader}>SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map(
                      (row: DailyChallengeLeaderBoardResponse) => (
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
                          <td className={styles.pos}>{row.userName}</td>
                          <td className={styles.score}>{row.score}</td>
                        </tr>
                      ),
                    )}
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
          className="btn m-2 btn-outline-light"
          onClick={fetchLeaderboard}
        >
          Refresh
        </button>
      </nav>
    </>
  );
}

export default function Leaderboard(): JSX.Element {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <img className={styles.header__icon} src={trophyImage} />
        <h1 className={styles.header__title}>
          <span>Leaderboard</span>
        </h1>
      </div>
      <div className={styles.center}>
        <div className={styles.ranklist}>
          <PaginatedItems />
        </div>
      </div>
    </div>
  );
}
