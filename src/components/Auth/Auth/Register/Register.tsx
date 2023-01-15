import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { default as ReCAPTCHA } from 'react-google-recaptcha';
import styles from '../auth.module.css';
import { SITE_KEY } from '../../../../config/config';
import { useNavigate } from 'react-router-dom';
import UserDetails from './FormDetails/UserDetails';
import UserCreditionals from './FormDetails/UserCreditionals';
import OtherDetails from './FormDetails/OtherDetails';
import { useAppSelector, useAppDispatch } from '../../../../store/hooks';
import {
  isRegistered,
  registerAction,
  registeredError,
} from '../../../../store/User/UserSlice';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Toast, { toast } from 'react-hot-toast';
let increment = 1;
let passCondition = 0;
export default function Register(): JSX.Element {
  const [selected, setSelected] = useState('IN');
  const [formNumber, setFormnumber] = useState(1);
  const [email, setEmail] = useState('');
  const [fullName, setfullName] = useState('');
  const [recaptchaCode, setRecpatchaCode] = useState('');
  const [college, setCollege] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const [submitFirst, issubmitFirst] = useState(false);
  const [submitSecond, issubmitSecond] = useState(false);
  const [submitThird, isSubmitThird] = useState(false);
  const [userNameError, isuserNameError] = useState(false);
  const [fullNameError, isfullNameError] = useState(false);
  const [emailError, isemailError] = useState(false);
  const [passwordError, ispasswordError] = useState(false);
  const [confirmpasswordError, isconfirmpasswordError] = useState(false);
  const [completed, isCompleted] = useState(false);
  const [collegeError, iscollegeError] = useState(false);
  const [isHuman, setIshuman] = useState(false);
  const [avatarID, setAvatarID] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let registeredStatus = false;
  registeredStatus = useAppSelector(isRegistered);
  const registerError = useAppSelector(registeredError);
  useEffect(() => {
    if (localStorage.getItem('token') != null && completed) {
      navigate('/dashboard', { replace: true });
    }
  }, []);
  useEffect(() => {
    switch (registerError) {
      case 'Username/Email already exists':
        setFormnumber(1);
        increment = 1;
        setUsername('');
        isuserNameError(true);
        setEmail('');
        isemailError(true);
        isCompleted(false);
        toast.error('Username/Email already exists');
        break;
    }
  }, [registerError]);
  useEffect(() => {
    if (registeredStatus) {
      setFormnumber(1);
      increment = 1;
      Toast.success('Registeration Successful');
      navigate('/login', { replace: true });
    }
  }, [registeredStatus]);
  const handleRecaptcha = (value: string | null) => {
    if (value) setIshuman(true);
    if (value != null) {
      setRecpatchaCode(value);
    }
  };
  const handleFullname = () => {
    if (fullName.trim().length < 5) {
      isfullNameError(true);
      passCondition += 1;
    } else {
      isfullNameError(false);
    }
  };
  const handleUsername = () => {
    if (userName.trim().length < 5 || userName.length < 5) {
      passCondition += 1;
      isuserNameError(true);
    } else {
      isuserNameError(false);
    }
  };
  const handleEmail = () => {
    const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(mailformat)) {
      isemailError(false);
    } else {
      isemailError(true);
      passCondition += 1;
    }
  };

  const handlepassword = () => {
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (!password.match(passwordFormat)) {
      ispasswordError(true);
      passCondition += 1;
    } else {
      ispasswordError(false);
    }
  };
  const handleConfirmpassword = () => {
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (
      !(password === confirmPassword) ||
      !confirmPassword.match(passwordFormat)
    ) {
      isconfirmpasswordError(true);
      passCondition += 1;
    } else {
      isconfirmpasswordError(false);
    }
  };

  const handleAvatarChange = (id: number) => {
    setAvatarID(id);
  };

  const handleCollege = () => {
    isSubmitThird(true);
    if (college.trim().length == 0 || college.trim() == '') {
      passCondition += 1;
      iscollegeError(true);
    } else {
      iscollegeError(false);
      handleRegistration();
    }
  };
  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollege(e.target.value);
    if (submitThird) {
      if (e.target.value.trim().length == 0) {
        iscollegeError(true);
      } else {
        iscollegeError(false);
      }
    }
  };
  const handleStepSubmit = (step: number) => {
    switch (step) {
      case 1:
        issubmitFirst(true);
        passCondition = 0;
        handleFullname();
        handleEmail();
        handlepassword();
        handleConfirmpassword();
        break;
      case 2:
        issubmitSecond(true);
        passCondition = 0;
        handleUsername();
        break;
    }
  };
  const handleForm = (level: number) => {
    if (passCondition == 0) {
      if (level == 1) {
        increment += 1;
      }

      if (level == -1) {
        increment -= 1;
      }
    }
    setFormnumber(increment);
  };
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfullName(e.target.value);
    if (submitFirst) {
      if (e.target.value.trim().length < 5 || fullName.length < 4) {
        isfullNameError(true);
      } else {
        isfullNameError(false);
      }
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (submitFirst) {
      if (e.target.value.trim().length < 5 || userName.length < 4) {
        isuserNameError(true);
      } else {
        isuserNameError(false);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (submitFirst) {
      const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (e.target.value.match(mailformat) || email.match(mailformat)) {
        isemailError(false);
      } else {
        isemailError(true);
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    setpassword(e.target.value);
    if (submitSecond) {
      if (e.target.value.match(passwordFormat)) {
        ispasswordError(false);
      } else {
        ispasswordError(true);
      }
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmpassword(e.target.value);
    if (submitSecond) {
      if (e.target.value != password) {
        isconfirmpasswordError(true);
      } else {
        isconfirmpasswordError(false);
      }
    }
  };
  const handleNext = () => {
    if (handleError(formNumber)) {
      handleStepSubmit(formNumber);
      handleForm(1);
    }
  };

  const handleError = (formNumber: number) => {
    if (formNumber == 1) {
      if (fullNameError) {
        toast.error('Name should have atleast 5 characters');
      } else if (emailError) {
        toast.error('Invalid email');
      } else if (confirmpasswordError) {
        toast.error('Check your Password');
      } else {
        return true;
      }
    }
    if (formNumber == 2) {
      if (collegeError) {
        toast.error('Please enter your college name');
      } else if (userNameError) {
        toast.error('Username should have atleast 5 characters');
      } else {
        return true;
      }
    }
  };

  const handlePrevious = () => {
    handleStepSubmit(formNumber - 1);
    handleForm(-1);
    isCompleted(false);
  };
  const getCountryName = (code: string) => {
    const countryName = new Intl.DisplayNames(['en'], {
      type: 'region',
    }).of(code);

    return countryName ? countryName : 'INDIA';
  };
  const handleRegistration = async () => {
    isCompleted(true);

    dispatch(
      registerAction({
        id: '',
        username: userName,
        name: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        country: getCountryName(selected),
        college: college,
        avatarId: avatarID,
        recaptchaCode: recaptchaCode,
      }),
    );
  };
  const handleFlagSelect = (code: string) => {
    setSelected(code);
  };
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.signUpText}> Sign Up</h1>
      <div className={styles.registerContainer}>
        <Form>
          {formNumber === 1 ? (
            <>
              <UserDetails
                submitFirst={submitFirst}
                handleFullNameChange={handleFullNameChange}
                handleEmailChange={handleEmailChange}
                fullName={fullName}
                fullNameError={fullNameError}
                email={email}
                emailError={emailError}
                register={true}
                handlePasswordChange={handlePasswordChange}
                handleConfirmPasswordChange={handleConfirmPasswordChange}
                password={password}
                passwordError={passwordError}
                confirmPassword={confirmPassword}
                confirmpasswordError={confirmpasswordError}
              />
            </>
          ) : formNumber === 2 ? (
            <>
              <UserCreditionals
                submitSecond={submitSecond}
                selectedCode={selected}
                userName={userName}
                userNameError={userNameError}
                handleUserNameChange={handleUserNameChange}
                handleFlagSelect={handleFlagSelect}
                formNumber={formNumber}
                handleCollegeChange={handleCollegeChange}
                college={college}
                collegeError={collegeError}
              />
            </>
          ) : formNumber === 3 ? (
            <>
              <div className={styles.formContainer}></div>
              <div>
                <OtherDetails
                  handleAvatarChange={handleAvatarChange}
                  submitThird={submitThird}
                  register={true}
                />
                <div className="form-row d-flex justify-content-center my-1">
                  <div className="d-flex justify-content-center input-group">
                    <ReCAPTCHA sitekey={SITE_KEY} onChange={handleRecaptcha} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div className={styles.footerContainer}>
            <div>
              {formNumber > 1 ? (
                <button
                  onClick={handlePrevious}
                  className={styles.previousButton}
                >
                  <FontAwesomeIcon
                    className={styles.buttonIcon}
                    icon={faChevronLeft as IconProp}
                  />
                  <div> BACK</div>
                </button>
              ) : (
                <></>
              )}
            </div>
            <div>
              {formNumber < 3 ? (
                <button onClick={handleNext} className={styles.nextButton}>
                  <div>NEXT </div>
                  <FontAwesomeIcon
                    className={styles.buttonIcon}
                    icon={faChevronRight as IconProp}
                  />
                </button>
              ) : (
                <></>
              )}
            </div>
            <div>
              {formNumber == 3 ? (
                <button
                  disabled={!isHuman}
                  onClick={handleCollege}
                  className={styles.signUpButton}
                >
                  <div>SIGN UP </div>
                  <FontAwesomeIcon
                    className={styles.buttonIcon}
                    icon={faChevronRight as IconProp}
                  />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
