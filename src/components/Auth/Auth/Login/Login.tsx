import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import styles from '../auth.module.css';
import { useNavigate } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BASE_PATH } from '../../../../config/config';
import { loginAction, loginError } from '../../../../store/User/UserSlice';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ForgetPassword from './ForgetPassword/ForgetPassword';
import toast from 'react-hot-toast';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, isOpen] = useState<boolean>(false);
  const hookDispatch = useAppDispatch();
  const loggedInError = useAppSelector(loginError);
  useEffect(() => {
    setPassword('');
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
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)) {
      toast.error('Invalid username or password');
    } else if (
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/,
      )
    ) {
      toast.error('Invalid username or password');
    } else {
      hookDispatch(loginAction({ email: email, password: password }));
    }
  };

  const handlePasswordSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.signInText}> Sign In</h1>
      <div className={styles.cardContainer}>
        <div className={styles.externalAuthButtons}>
          <div>
            <a
              href={`${BASE_PATH}/oauth2/authorization/google`}
              rel="noreferrer"
            >
              <button className={styles.googleButton}>
                <div className={styles.oauthButtonText}>
                  {' '}
                  LOGIN WITH GOOGLE{' '}
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
                <div className={styles.oauthButtonText}>
                  {' '}
                  LOGIN WITH GITHUB{' '}
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
                type="text"
                value={email}
                className={styles.email}
                onChange={handleEmailSubmit}
                placeholder="EMAIL  &#xf0e0; "
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                placeholder="PASSWORD  &#xf084; "
                onChange={handlePasswordSubmit}
                className={styles.password}
              />
            </div>
          </div>

          <div>
            <button
              className={styles.forgotPassword}
              onClick={handleForgetPassword}
            >
              {' '}
              FORGOT PASSWORD{' '}
            </button>
            <ForgetPassword
              open={open}
              handleForgetPassword={handleForgetPassword}
            />
          </div>
          <div>
            <div>
              <button
                type="button"
                className={styles.loginButton}
                onClick={handleLoginSubmit}
              >
                <div className={styles.iconAlign}>
                  <div className={styles.loginText}>LOGIN</div>
                  <div className={styles.line} />
                  <FontAwesomeIcon
                    className={styles.loginIcon}
                    icon={faChevronRight as IconProp}
                  />
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
