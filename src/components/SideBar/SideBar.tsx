import {
  IsSettingsOpen,
  isSettingsOpened,
} from '../../store/EditorSettings/settings';

import codeIcon from '../../assets/code_editor.svg';
import mapIcon from '../../assets/map.svg';
import leaderboardIcon from '../../assets/leaderboard.svg';
import commitIcon from '../../assets/commit.svg';
import battletvIcon from '../../assets/battletv.svg';
import documentationIcon from '../../assets/documentation.svg';

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './SideBar.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import deltaLogo from '../../assets/deltaLogo.png';
import {
  changePageState,
  IsTourOver,
} from '../../store/DailyChallenge/dailyChallenge';
import { useTour } from '@reactour/tour';
import { CurrentUserApi } from '@codecharacter-2024/client';
import { apiConfig } from '../../api/ApiConfig';

const icons = [
  { icon: codeIcon, route: 'dashboard', tooltip: 'Code Editor' },
  { icon: mapIcon, route: 'mapdesigner', tooltip: 'Map Designer' },
  { icon: leaderboardIcon, route: 'leaderboard', tooltip: 'Leaderboard' },
  { icon: commitIcon, route: 'history', tooltip: 'Commits' },
  { icon: battletvIcon, route: 'battletv', tooltip: 'Battle TV' },
];

const SideBar: React.FunctionComponent = () => {
  const isSettingsOpen = useAppSelector(IsSettingsOpen);

  function handleOpenSettings() {
    if (isSettingsOpen === true) dispatch(isSettingsOpened(false));
    else dispatch(isSettingsOpened(true));
  }
  const location = useLocation();
  const [pathName, setpathName] = useState('/dashboard');

  const { setIsOpen } = useTour();
  const isTourOver = useAppSelector(IsTourOver);

  const currentUserApi = new CurrentUserApi(apiConfig);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setpathName(location.pathname);
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('token') != null) {
        currentUserApi.getCurrentUser().then(res => {
          if (res.isTutorialComplete === false && res.tutorialLevel === 6) {
            setIsOpen(true);
          }
        });
      }
    }, 1000);
  }, [isTourOver]);

  return (
    <div>
      {pathName != '/' &&
      pathName != '/register' &&
      pathName != '/login' &&
      pathName != '/activate' &&
      pathName != '/reset-password' &&
      pathName != '/incomplete-profile' ? (
        <div className={styles.sideBar}>
          <div className={styles.up}>
            {icons.map(icon => {
              if (icon.tooltip === 'Editor Settings') {
                return (
                  <div key={icons.indexOf(icon)} className={styles.sideBarIcon}>
                    <img
                      src={icon.icon as string}
                      alt={icon.tooltip}
                      title={icon.tooltip}
                      onClick={handleOpenSettings}
                      className={styles.sideBarIconComponent}
                    />
                  </div>
                );
              } else if (icon.icon == codeIcon) {
                return (
                  <div key={icons.indexOf(icon)} className={styles.sideBarIcon}>
                    <Link to={icon.route} key={icon.route}>
                      <img
                        src={icon.icon as string}
                        alt={icon.tooltip}
                        title={icon.tooltip}
                        className={styles.sideBarIconComponent}
                        onClick={() => {
                          dispatch(changePageState('Dashboard'));
                        }}
                      />
                    </Link>
                  </div>
                );
              } else {
                return (
                  <div key={icons.indexOf(icon)} className={styles.sideBarIcon}>
                    <Link to={icon.route} key={icon.route}>
                      <img
                        src={icon.icon as string}
                        alt={icon.tooltip}
                        title={icon.tooltip}
                        className={styles.sideBarIconComponent}
                      />
                    </Link>
                  </div>
                );
              }
            })}
          </div>
          <div>
            <div className={styles.sideBarIcon} id="documentation">
              <div title="View Documentation">
                <a
                  href="https://codecharacter-docs-2023.netlify.app/"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <img
                    src={documentationIcon}
                    alt="delta"
                    className={styles.sideBarIconComponent}
                  />
                </a>
              </div>
            </div>
            <div className={styles.sideBarIcon} id="DELTA">
              <div title="Made with ❤ by Delta">
                <div
                  className={styles.deltaLogo}
                  onClick={() => {
                    window.open('https://delta.nitt.edu/');
                  }}
                >
                  <img src={deltaLogo} alt="delta" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideBar;
