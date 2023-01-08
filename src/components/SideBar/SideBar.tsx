import {
  IsSettingsOpen,
  isSettingsOpened,
} from '../../store/EditorSettings/settings';

import code_icon from '../../assets/code_editor.svg';
import map_icon from '../../assets/map.svg';
import leaderboard_icon from '../../assets/leaderboard.svg';
import commit_icon from '../../assets/commit.svg';
import battletv_icon from '../../assets/battletv.svg';
import documentation_icon from '../../assets/documentation.svg';

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './SideBar.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import deltaLogo from '../../assets/deltaLogo.png';

const icons = [
  { icon: code_icon, route: 'dashboard', tooltip: 'Code Editor' },
  { icon: map_icon, route: 'mapdesigner', tooltip: 'Map Designer' },
  { icon: leaderboard_icon, route: 'leaderboard', tooltip: 'Leaderboard' },
  { icon: commit_icon, route: 'history', tooltip: 'Commits' },
  { icon: battletv_icon, route: 'battletv', tooltip: 'Battle TV' },
];

const SideBar: React.FunctionComponent = () => {
  const isSettingsOpen = useAppSelector(IsSettingsOpen);

  function handleOpenSettings() {
    if (isSettingsOpen === true) dispatch(isSettingsOpened(false));
    else dispatch(isSettingsOpened(true));
  }
  const location = useLocation();
  const [pathName, setpathName] = useState('/dashboard');
  useEffect(() => {
    setpathName(location.pathname);
  }, [location]);
  const dispatch = useAppDispatch();

  return (
    <div>
      {pathName != '/' &&
      pathName != '/register' &&
      pathName != '/login' &&
      pathName != '/activate' &&
      pathName != '/reset-password' &&
      pathName != '/profile' &&
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
            <div className={styles.sideBarIcon}>
              <div title="View Documentation">
                <a
                  href="https://codecharacter-docs-2022.vercel.app/"
                  rel="noreferrer noopener"
                >
                  <img
                    src={documentation_icon}
                    alt="delta"
                    className={styles.sideBarIconComponent}
                  />
                </a>
              </div>
            </div>
            <div className={styles.sideBarIcon}>
              <div title="Made with ❤ by Delta">
                <div className={styles.deltaLogo}>
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
