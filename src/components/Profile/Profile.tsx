import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AlertMessage from '../Auth/Auth/Alert/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactFlagsSelect from 'react-flags-select';
import styles from './profile.module.css';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
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
import PasswordAlertMessage from '../Auth/Auth/Alert/PassworAlert';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getAvatarByID, getAllAvatars } from '../Avatar/Avatar';

const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  const avatars = getAllAvatars();

  const [selectedFlag, setSelectedFlag] = useState('IN');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const [oldPassword, setOldpassword] = useState('');
  const [submitPassword, issubmitPassword] = useState(false);
  const [submitconfirmPassword, issubmitconfirmPassword] = useState(false);
  const [submitoldPassword, issubmitoldPassword] = useState(false);
  const [collegeName, setCollegeName] = useState('');
  const [userName, setUsername] = useState('');
  const [submitCollege, issubmitCollege] = useState(false);
  const [submitUsername, issubmitUsername] = useState(false);
  const [userNameError, isuserNameError] = useState(false);
  const [collegeError, isCollegeError] = useState(false);
  const [passwordError, ispasswordError] = useState(false);
  const [confirmpasswordError, isconfirmpasswordError] = useState(false);
  const [oldpasswordError, isoldpasswordError] = useState(false);
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

  useEffect(() => {
    if (err) isoldpasswordError(true);
  }, [loadingStatus, err]);
  const success = useAppSelector(isSuccess);
  const userSuccesschange = useAppSelector(isSuccessUser);
  useEffect(() => {
    if (userSuccesschange) {
      setUsername('');
      setCollegeName('');
      isuserNameError(false);
      isCollegeError(false);
      issubmitUsername(false);
      issubmitCollege(false);
    }
  }, [userSuccesschange]);
  useEffect(() => {
    if (submitoldPassword && err == false) {
      setOldpassword('');
      setpassword('');
      setConfirmpassword('');
      issubmitPassword(false);
      issubmitoldPassword(false);
      issubmitconfirmPassword(false);
      ispasswordError(false);
      isoldpasswordError(false);
      isconfirmpasswordError(false);
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
    issubmitCollege(true);
    if (e.target.value.trim().length == 0) isCollegeError(true);
    else isCollegeError(false);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    issubmitUsername(true);
    if (e.target.value.trim().length < 5) {
      isuserNameError(true);
    } else {
      isuserNameError(false);
    }
  };

  const hanldeOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldpassword(e.target.value);
    if (submitoldPassword) {
      if (e.target.value.length < 8) isoldpasswordError(true);
      else isoldpasswordError(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
    issubmitPassword(true);
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (e.target.value.match(passwordFormat)) {
      ispasswordError(false);
    } else {
      ispasswordError(true);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmpassword(e.target.value);
    issubmitconfirmPassword(true);
    if (e.target.value != password) {
      isconfirmpasswordError(true);
    } else {
      isconfirmpasswordError(false);
    }
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
          userName.toString().trim() === '' ? loggedInUser.name : userName,
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
    issubmitoldPassword(true);
    dispatch(
      changeUserCreditionalsAction({
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: confirmPassword,
      }),
    );
  };
  const handleAvatarChange = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleGoBacktoDash = () => {
    navigate(-1);
  };

  const handleDownButton = () => {
    const profileScrollBody = document.getElementById('profileScrollBody');
    if (profileScrollBody) {
      profileScrollBody.scrollTo({
        top: 1900,
        behavior: 'smooth',
      });
    }
  };

  const handleGoBacktoProfile = () => {
    const profileScrollBody = document.getElementById('profileScrollBody');
    if (profileScrollBody) {
      profileScrollBody.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.profileScrollBody} id="profileScrollBody">
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
                  className={classnames(
                    submitUsername
                      ? userNameError
                        ? styles.error
                        : styles.correct
                      : styles.normal,
                    styles.inputField,
                  )}
                  onChange={handleUserNameChange}
                />
                {submitUsername && userNameError ? (
                  <AlertMessage err={userNameError} content={'Invalid name'} />
                ) : (
                  <></>
                )}
              </Form.Group>
              <Form.Group
                className={classnames('mb-4', styles.formField)}
                controlId="formBasicCollege"
              >
                <Form.Control
                  type="text"
                  placeholder={loggedInUser.college || 'College'}
                  value={collegeName}
                  className={classnames(
                    submitCollege
                      ? collegeError
                        ? styles.error
                        : styles.correct
                      : styles.normal,
                    styles.inputField,
                  )}
                  onChange={handleCollegeChange}
                />
                {collegeError ? (
                  <AlertMessage
                    err={collegeError}
                    content={'Please enter a valid College name'}
                  />
                ) : (
                  <></>
                )}
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
                    selectedFlag !== loggedInUser.country
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
                      {'< Go Back'}
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => {
                        handleDownButton();
                        dispatch(creditionals());
                      }}
                      className={styles.linkButton}
                    >
                      {'Change Credentials >'}
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
                    className={classnames(
                      submitoldPassword
                        ? oldpasswordError && err
                          ? styles.error
                          : oldpasswordError == false && err == false
                          ? styles.correct
                          : styles.normal
                        : styles.normal,
                      styles.inputField,
                    )}
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
                {oldpasswordError && err ? (
                  <AlertMessage
                    err={oldpasswordError}
                    content={'Incorrect Old Password'}
                  />
                ) : (
                  <></>
                )}
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
                    className={classnames(
                      submitPassword
                        ? passwordError
                          ? styles.error
                          : styles.correct
                        : styles.normal,
                      styles.inputField,
                    )}
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
                <PasswordAlertMessage
                  err={submitPassword && passwordError}
                  variantColor="danger"
                />
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
                    className={classnames(
                      submitconfirmPassword
                        ? confirmpasswordError
                          ? styles.error
                          : styles.correct
                        : styles.normal,
                      styles.inputField,
                    )}
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
                {confirmpasswordError ? (
                  <AlertMessage
                    err={confirmpasswordError}
                    content={'Please check your password'}
                  />
                ) : (
                  <></>
                )}
              </Form.Group>
              <div className={classnames('d-grid gap-2')}>
                <Button
                  onClick={handleCreditionals}
                  disabled={
                    oldpasswordError ||
                    passwordError ||
                    confirmpasswordError ||
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
              {'< Edit Profile'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
