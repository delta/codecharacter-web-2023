import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './NavBar.module.css';
import Notifs from '../Notifs/Notifs';
import { getAvatarByID } from '../Avatar/Avatar';
import {
  getUserDetailsAction,
  isloggedIn,
  loggedIn,
  user,
  logout,
} from '../../store/User/UserSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthApi } from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Toast from 'react-hot-toast';
import DashboardOptions from '../DashboardOptions/DashboardOptions';
import { cookieDomain } from '../../config/config.example';

import sign_up from '../../assets/sign_up.png';
import sign_in from '../../assets/sign_in.png';

// import challenge_available from '../../assets/challenge_available.png';
import challenge_done from '../../assets/challenge_done.png';


const NavBar: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInUser = useAppSelector(user);
  const isLogged = useAppSelector(isloggedIn);
  // add new state here for dc

  // useEffect(() => {
  //   if (window.location.hash == '#/register')
  //     navigate('/register', { replace: true });
  //   if (
  //     localStorage.getItem('token') == null &&
  //     window.location.hash != '#/register'
  //   ) {
  //     console.log('navbar redirect');
  //     navigate('/login', { replace: true });
  //   }
  // }, [window.location.hash]);
  useEffect(() => {
    const cookieValue = document.cookie;
    const bearerToken = cookieValue.split(';');
    bearerToken.map(cookie => {
      if (cookie.trim().startsWith('bearer-token') != false) {
        const index = cookie.indexOf('=') + 1;
        const token = cookie.slice(index);
        localStorage.setItem('token', token);
        dispatch(loggedIn());
      }
    });
  }, [document.cookie]);
  useEffect(() => {
    if (localStorage.getItem('token') != null) dispatch(getUserDetailsAction());
  }, [loggedInUser]);
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      const authApi = new AuthApi(apiConfig);
      authApi
        .getAuthStatus()
        .then(res => {
          const { status } = res;
          if (status === 'PROFILE_INCOMPLETE') {
            navigate('/incomplete-profile', { replace: true });
          } else if (status === 'AUTHENTICATED') {
            if (localStorage.getItem('token') != null) {
              navigate('/dashboard', { replace: true });
            }
          }
        })
        .catch((e: Error) => {
          if (e instanceof ApiError) {
            Toast.error(e.message);
          }
        });
    }
  }, [isLogged]);

  function deleteCookie(name: string) {
    document.cookie =
      name +
      `=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;domain=${cookieDomain};`;
  }

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    deleteCookie('bearer-token');

    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navBarContainer}>
        <div className={styles.branding}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.navLogo}>{'<CodeCharacter/>'}</div>
          </Link>
        </div>

        {(location.pathname === '/' || location.pathname === '/register') &&

          !isLogged && (

            <div className={styles.navContainer}>
              <NavLink to="/login" className={`${styles.navLink}`}>
                <img src={sign_in} />
                Sign In
              </NavLink>
            </div>
          )}

        {location.pathname === '/login' && !isLogged && (

          <div className={styles.navContainer}>
            <NavLink to="/register" className={`${styles.navLink}`}>
              <img src={sign_up} />
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
      {localStorage.getItem('token') != null &&
      location.pathname != '/incomplete-profile' &&
      location.pathname != '/' ? (
        <div className={styles.profileIcons}>
          <div className={styles.notifIconContainer}>
            <img
              src={challenge_done}
              className={styles.dcIcon}
              title="Daily Challenge"
            />
          </div>
          <div className={styles.notifIcon}>
            <Notifs />
          </div>
          <div className={styles.ProfileIcon}>
            <DashboardOptions
              image={
                <img
                  className={styles.profileIconImg}
                  src={getAvatarByID(loggedInUser.avatarId).url}
                  alt="Profile Icon"
                  title="Profile Icon"
                />
              }
              onLogout={() => {
                handleLogout();
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavBar;
