import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import styles from '../auth.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BASE_PATH } from '../../../../config/config';
import {
  loginAction,
  switchRegister,
  loginError,
} from '../../../../store/User/UserSlice';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import toast from 'react-hot-toast';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [emailError, isemailError] = useState(false);
  const [passwordError, ispasswordError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, islogin] = useState(false);
  const [typing, isTyping] = useState<boolean>(false);
  const [open, isOpen] = useState<boolean>(false);
  const hookDispatch = useAppDispatch();
  const loggedInError = useAppSelector(loginError);
  useEffect(() => {
    switch (loggedInError) {
      case 'Invalid Password':
        setPassword('');
        ispasswordError(true);
        toast.error('Invalid Password');
        break;
      case 'User not found':
        setEmail('');
        isemailError(true);
        setPassword('');
        ispasswordError(true);
        islogin(false);
        toast.error('user not found');
        break;
    }
  }, [loggedInError]);
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      navigate('/dashboard', { replace: true });
    }
  }, [localStorage.getItem('token')]);
  const handleForgetPassword = () => {
    if (open == false) isOpen(true);
    else isOpen(false);
  };
  const handleLoginSubmit = () => {
    islogin(true);
    const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (loggedInError != 'NIL' && !typing) {
      toast.error(loggedInError);
    }

    if (email.match(mailformat)) {
      isemailError(false);
    } else {
      isemailError(true);
    }
    if (password.match(passwordFormat)) {
      ispasswordError(false);
    } else {
      ispasswordError(true);
    }
    if (!(emailError && passwordError)) {
      isTyping(false);
      hookDispatch(loginAction({ email: email, password: password }));
    }
    if ((emailError && login) || (passwordError && login)) {
      toast.error('Invalid Username or Password');
    }
  };

  const handlePasswordSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != null) {
      setPassword(event.target.value);
      isTyping(true);
    }
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (event.target.value.toString().match(passwordFormat)) {
      ispasswordError(false);
    } else {
      ispasswordError(true);
    }
  };

  const handleEmailSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (event.target.value.match(mailformat)) {
      isemailError(false);
    } else {
      isemailError(true);
    }
  };

  const switchRegisterAction = () => {
    hookDispatch(switchRegister());
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.titleContainer}> Sign In</h1>
      <div className={styles.cardContainer}>
        <div className={styles.externalAuthButtons}>
          <div>
            <a
              href={`${BASE_PATH}/oauth2/authorization/google`}
              rel="noreferrer"
            >
              <button className={styles.googleButton}>
                <div>
                  {' '}
                  LOGIN WITH GOOGLE &nbsp;
                  <FontAwesomeIcon icon={faGoogle as IconProp} />
                </div>
              </button>
            </a>
          </div>
          <div>
            <a
              href={`${BASE_PATH}/oauth2/authorization/github`}
              rel="noreferrer"
            >
              <button className={styles.githubButton}>
                <div>
                  {' '}
                  LOGIN WITH GITHUB &nbsp;{' '}
                  <FontAwesomeIcon icon={faGithub as IconProp} />
                </div>
              </button>
            </a>
          </div>
        </div>
        <div className={styles.separator}>
          <div className={styles.verticalLine} />
          <h2 className={styles.subText}>OR</h2>
          <div className={styles.verticalLine} />
        </div>
        <form className={styles.formContainer}>
          <div className={styles.loginCredentialsContainer}>
            <div>
              <input
                type="email"
                value={email}
                className={styles.email}
                onChange={handleEmailSubmit}
                placeholder="EMAIL"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                placeholder="PASSWORD"
                onChange={handlePasswordSubmit}
                className={styles.password}
              />
            </div>
          </div>

          <div>
            <div
              className={styles.forgotPassword}
              onClick={handleForgetPassword}
            >
              {' '}
              FORGOT PASSWORD{' '}
            </div>
            <ForgetPassword
              open={open}
              handleForgetPassword={handleForgetPassword}
            />
          </div>
          <div>
            <div>
              <button
                className={styles.loginButton}
                onClick={handleLoginSubmit}
              >
                <div className={styles.iconAlign}>
                  <div className={styles.loginText}>LOGIN</div>
                  <div className={styles.line} />
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faChevronRight as IconProp}
                  />
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.linkContainer}>
        <span>
          {' '}
          <NavLink
            to={'/register'}
            className={styles.link}
            onClick={switchRegisterAction}
          >
            {' '}
            <b>register</b>
          </NavLink>
        </span>
      </div>
    </div>
  );
}
export default Login;
