import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactFlagsSelect from 'react-flags-select';
import styles from './profile.module.css';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
  getUserDetailsAction,
  user,
  changeUserDetailsAction,
  changeUserCreditionalsAction,
  loading,
  isCreditionalError,
  isSuccess,
  logout,
  creditionals,
  isSuccessUser,
} from '../../store/User/UserSlice';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getAvatarByID, getAllAvatars } from '../Avatar/Avatar';
import angleBracketRight from '../../assets/angle_bracket_right.svg';
import angleBracketLeft from '../../assets/angle_bracket_left.svg';

const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const avatars = getAllAvatars();

  const [selectedFlag, setSelectedFlag] = useState('IN');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const [oldPassword, setOldpassword] = useState('');
  const [submitoldPassword, issubmitoldPassword] = useState(false);
  const [collegeName, setCollegeName] = useState('');
  const [userName, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [passwordType, setPasswordType] = useState<{
    oldpassword: string;
    password: string;
    confirmPassword: string;
  }>({
    oldpassword: 'password',
    password: 'password',
    confirmPassword: 'password',
  });
  const err = useAppSelector(isCreditionalError);
  const profileScrollRef = useRef<HTMLDivElement>(null);
  const oldpasswordTypeAction = () => {
    if (passwordType.oldpassword === 'password') {
      setPasswordType({
        oldpassword: 'text',
        password: passwordType.password,
        confirmPassword: passwordType.confirmPassword,
      });
    } else {
      setPasswordType({
        oldpassword: 'password',
        password: passwordType.password,
        confirmPassword: passwordType.confirmPassword,
      });
    }
  };

  const passwordTypeAction = () => {
    if (passwordType.password === 'password') {
      setPasswordType({
        oldpassword: passwordType.oldpassword,
        password: 'text',
        confirmPassword: passwordType.confirmPassword,
      });
    } else {
      setPasswordType({
        oldpassword: passwordType.oldpassword,
        password: 'password',
        confirmPassword: passwordType.confirmPassword,
      });
    }
  };

  const confirmpasswordTypeAction = () => {
    if (passwordType.confirmPassword === 'password') {
      setPasswordType({
        oldpassword: passwordType.oldpassword,
        password: passwordType.password,
        confirmPassword: 'text',
      });
    } else {
      setPasswordType({
        oldpassword: passwordType.oldpassword,
        password: passwordType.password,
        confirmPassword: 'password',
      });
    }
  };
  const loadingStatus = useAppSelector(loading);
  const dispatch = useAppDispatch();

  const success = useAppSelector(isSuccess);
  const userSuccesschange = useAppSelector(isSuccessUser);
  useEffect(() => {
    if (userSuccesschange) {
      setUsername('');
      setCollegeName('');
    }
  }, [userSuccesschange]);
  useEffect(() => {
    if (submitoldPassword && err == false) {
      setOldpassword('');
      setpassword('');
      setConfirmpassword('');
      issubmitoldPassword(false);
      dispatch(logout());
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  }, [success]);
  const loggedInUser = useAppSelector(user);
  useEffect(() => {
    setSelectedAvatar(loggedInUser.avatarId);
  }, [loggedInUser]);
  useEffect(() => {
    if (localStorage.getItem('token') != null) dispatch(getUserDetailsAction());
  }, [loggedInUser]);

  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollegeName(e.target.value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const hanldeOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldpassword(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmpassword(e.target.value);
  };

  const getCountryName = (code: string) => {
    const countryName = new Intl.DisplayNames(['en'], {
      type: 'region',
    }).of(code);

    return countryName ? countryName : 'INDIA';
  };
  const handleSubmit = () => {
    dispatch(
      changeUserDetailsAction({
        userName:
          userName.toString().trim() === '' ? loggedInUser.username : userName,
        college:
          collegeName.toString().trim() === ''
            ? loggedInUser.college
            : collegeName,
        country: getCountryName(selectedFlag),
        avatarId: selectedAvatar,
      }),
    );
  };

  const handleCreditionals = () => {
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (oldPassword.length < 8) {
      toast.error('Incorrect Old password');
    } else if (!password.match(passwordFormat)) {
      toast.error(t => (
        <ul className={styles.toastPassword}>
          <li>Password needs to be minimum 8 characters long</li>
          <li>
            Password must contain atleast 1 Number, 1 Upper case and 1 Special
            Character
          </li>
        </ul>
      ));
    } else if (confirmPassword !== password) {
      toast.error("Confirm password and Password don't match");
    } else {
      dispatch(
        changeUserCreditionalsAction({
          oldPassword: oldPassword,
          newPassword: password,
          confirmPassword: confirmPassword,
        }),
      );
    }
  };
  const handleAvatarChange = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleGoBacktoDash = () => {
    navigate(-1);
  };

  const handleGoToCreds = () => {
    if (profileScrollRef.current) {
      profileScrollRef.current.scrollTo({
        top: 1900,
        behavior: 'smooth',
      });
    }
  };

  const handleGoBacktoProfile = () => {
    if (profileScrollRef.current) {
      profileScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={styles.profileScrollBody}
      id="profileScrollBody"
      ref={profileScrollRef}
    >
      <div className={styles.profileBody}>
        <div className={styles.header} id="header">
          <div className={styles.userNameContent}>
            HEY, <p className={styles.userName}>{loggedInUser.username}</p>{' '}
          </div>
          <div className={styles.imageContainer}>
            <img
              src={getAvatarByID(loggedInUser.avatarId).url}
              alt="User Avatar"
            />
          </div>
        </div>

        <div className={styles.Container}>
          <Form className={styles.formContainer}>
            <div>
              <Form.Group
                className={classnames('mb-4', styles.formField)}
                controlId="formBasicUserName"
              >
                <Form.Control
                  type="text"
                  placeholder={loggedInUser.name || 'Full Name'}
                  value={userName}
                  className={styles.inputField}
                  onChange={handleUserNameChange}
                />
              </Form.Group>
              <Form.Group
                className={classnames('mb-4', styles.formField)}
                controlId="formBasicCollege"
              >
                <Form.Control
                  type="text"
                  placeholder={loggedInUser.college || 'College'}
                  value={collegeName}
                  className={styles.inputField}
                  onChange={handleCollegeChange}
                />
              </Form.Group>
              <Form.Group
                className={classnames('mb-4', styles.formField)}
                controlId="formBasicEmail"
              >
                <ReactFlagsSelect
                  selected={selectedFlag}
                  searchable={true}
                  id="flags"
                  placeholder="Search your country"
                  onSelect={code => {
                    setSelectedFlag(code);
                  }}
                  className={classnames(
                    styles.flagContainer,
                    styles.inputField,
                  )}
                  selectedSize={33}
                />
              </Form.Group>
              <Form.Group
                className={classnames('mb-4')}
                controlId="formBasicAvatar"
              >
                <div>
                  <div className={styles.avatarContainer}>
                    {avatars.map((avatar, index: number) => (
                      <div
                        key={index}
                        className={`${styles.avatar} ${
                          selectedAvatar === avatar.id
                            ? styles.avatarSelected
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedAvatar(avatar.id);
                          handleAvatarChange(avatar.id);
                        }}
                      >
                        <img
                          className={styles.avatarImg}
                          src={avatar.url}
                          alt="avatar"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Form.Group>
              <div className={classnames('d-grid gap-2')}>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    userName.length < 5 &&
                    collegeName.length == 0 &&
                    selectedAvatar === loggedInUser.avatarId &&
                    getCountryName(selectedFlag) === loggedInUser.country
                  }
                  size="lg"
                  className={styles.submitContainer}
                >
                  Save Changes{' '}
                  {loadingStatus ? (
                    <FontAwesomeIcon icon={faSpinner as IconProp} />
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
              <div className={styles.footer}>
                {
                  <>
                    <Button
                      variant="link"
                      onClick={handleGoBacktoDash}
                      className={styles.linkButton}
                    >
                      <img src={angleBracketLeft} alt="Angle Bracket Left" />
                      {' GO BACK'}
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => {
                        handleGoToCreds();
                        dispatch(creditionals());
                      }}
                      className={styles.linkButton}
                    >
                      {'CHANGE CREDENTIALS '}
                      <img src={angleBracketRight} alt="Angle Bracket Right" />
                    </Button>
                  </>
                }
              </div>
            </div>
            <div>
              <div className={styles.changeCredsHeader}>Change Credentials</div>
              <Form.Group
                className={classnames('mb-4', styles.formField)}
                controlId="formBasicoldPassword"
              >
                <div className={styles.eyeContainer}>
                  <Form.Control
                    type={passwordType.oldpassword}
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={hanldeOldPasswordChange}
                    className={styles.inputField}
                  />
                  <div className={styles.eye}>
                    {passwordType.oldpassword === 'password' ? (
                      <FontAwesomeIcon
                        size="lg"
                        icon={faEyeSlash as IconProp}
                        onClick={oldpasswordTypeAction}
                      />
                    ) : (
                      <FontAwesomeIcon
                        size="lg"
                        icon={faEye as IconProp}
                        onClick={oldpasswordTypeAction}
                      />
                    )}
                  </div>
                </div>
              </Form.Group>
              <Form.Group
                className={classnames('mb-4', styles.formField)}
                controlId="formBasicPassword"
              >
                <div className={styles.eyeContainer}>
                  <Form.Control
                    type={passwordType.password}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={styles.inputField}
                  />
                  <div className={styles.eye}>
                    {passwordType.password === 'password' ? (
                      <FontAwesomeIcon
                        size="lg"
                        icon={faEyeSlash as IconProp}
                        onClick={passwordTypeAction}
                      />
                    ) : (
                      <FontAwesomeIcon
                        size="lg"
                        icon={faEye as IconProp}
                        onClick={passwordTypeAction}
                      />
                    )}
                  </div>
                </div>
              </Form.Group>
              <Form.Group
                className={classnames('mb-4', styles.formField)}
                controlId="formBasicConfirmPassword"
              >
                <div className={styles.eyeContainer}>
                  <Form.Control
                    type={passwordType.confirmPassword}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    className={styles.inputField}
                    onChange={handleConfirmPasswordChange}
                  />
                  <div className={styles.eye}>
                    {passwordType.confirmPassword === 'password' ? (
                      <FontAwesomeIcon
                        size="lg"
                        icon={faEyeSlash as IconProp}
                        onClick={confirmpasswordTypeAction}
                      />
                    ) : (
                      <FontAwesomeIcon
                        size="lg"
                        icon={faEye as IconProp}
                        onClick={confirmpasswordTypeAction}
                      />
                    )}
                  </div>
                </div>
              </Form.Group>
              <div className={classnames('d-grid gap-2')}>
                <Button
                  onClick={handleCreditionals}
                  disabled={
                    oldPassword.length == 0 ||
                    password.length == 0 ||
                    confirmPassword.length == 0
                  }
                  size="lg"
                  id="submit"
                  className={styles.submitContainer}
                >
                  Submit{' '}
                  {loadingStatus ? (
                    <FontAwesomeIcon icon={faSpinner as IconProp} />
                  ) : (
                    <></>
                  )}
                </Button>
              </div>
            </div>
          </Form>
          <div className={styles.footer}>
            <Button
              variant="link"
              onClick={handleGoBacktoProfile}
              className={styles.linkButton}
            >
              <img src={angleBracketLeft} alt="Angle Bracket Left" />
              {' EDIT PROFILE'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
