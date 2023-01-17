import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getLogAction } from '../../store/rendererLogs/logSlice';
import { useNavigate } from 'react-router-dom';
import styles from './BattleTV.module.css';
import { battleTvSelector, fetchBattleTv } from './BattleTvSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getAvatarByID } from '../Avatar/Avatar';
import { Match, Verdict } from '@codecharacter-2023/client';
import { User, user } from '../../store/User/UserSlice';
import { Table } from 'react-bootstrap';

function getIcon(loggedInUser: User, match: Match) {
  if (loggedInUser.username === match.user1.username) {
    // user is PLAYER1
    if (match.matchVerdict === Verdict.Player1) {
      return styles.battlecardwin;
    } else if (match.matchVerdict == Verdict.Player2) {
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

function getUsersGame(loggedInUser: User, match: Match) {
  const games = [...match.games.values()];
  if (loggedInUser.username == match.user1.username) {
    return games[0];
  } else {
    return games[games.length - 1];
  }
}

function PaginatedItems() {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState<Match[]>([]);
  const navigate = useNavigate();

  const itemsPerPage = 8;

  const { battletv, loading, hasbeenFetched, hasErrors } =
    useAppSelector(battleTvSelector);

  const loggedInUser = useAppSelector(user);

  // initialize the redux hook
  const dispatch = useAppDispatch();

  if (!hasbeenFetched) {
    dispatch(fetchBattleTv());
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(battletv.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(battletv.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, battletv]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % battletv.length;
    setItemOffset(newOffset);
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
            <div className={styles.list}>
              <Table hover className={styles.list} responsive>
                <thead>
                  <tr className={styles.tableHeader}>
                    <th className={styles.tableHeader} colSpan={2}>
                      ATTACKER
                    </th>
                    <th className={styles.tableHeader}>COINS USED</th>
                    <th className={styles.tableHeader}></th>
                    <th className={styles.tableHeader}>DESTRUCTION %</th>
                    <th className={styles.tableHeader} colSpan={2}>
                      DEFENDER
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map((match: Match) => (
                      <tr
                        className={
                          styles.item + ' ' + getIcon(loggedInUser, match)
                        }
                        key={match.user1.username}
                      >
                        <td className={styles.score}>
                          <img
                            className={styles.pic}
                            src={getAvatarByID(match.user1.avatarId).url}
                          ></img>
                        </td>
                        <td className={styles.score}>{match.user1.username}</td>
                        <td className={styles.score}>
                          {[...match.games.values()][0].coinsUsed}
                        </td>
                        <td>
                          <img
                            src="/src/assets/watch.png"
                            className={styles.watchButton}
                            onClick={() => {
                              dispatch(
                                getLogAction({
                                  id: getUsersGame(loggedInUser, match).id,
                                  callback: () => {
                                    navigate('/dashboard');
                                  },
                                }),
                              );
                            }}
                          />
                        </td>
                        <td className={styles.score}>
                          {[...match.games.values()][
                            [...match.games.values()].length === 1 ? 0 : 1
                          ].destruction.toFixed(2)}
                        </td>
                        <td className={styles.score}>{match.user2.username}</td>
                        <td className={styles.score}>
                          <img
                            className={styles.pic}
                            src={getAvatarByID(match.user2.avatarId).url}
                          ></img>
                        </td>
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
          previousLabel="<"
          nextLabel=">"
          pageLinkClassName={styles.pageNum}
          previousLinkClassName={styles.pageNum}
          nextLinkClassName={styles.pageNum}
          breakLabel="..."
          breakLinkClassName={styles.pageNum}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          activeClassName="active"
        />
      </nav>
    </>
  );
}
export default function BattleTV(): JSX.Element {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.header__title}>
          <span>Battle TV</span>
        </h1>
      </div>
      <div className={styles.ranklist}>
        <PaginatedItems />
      </div>
    </div>
  );
}
