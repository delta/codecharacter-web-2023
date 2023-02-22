import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import styles from '../auth.module.css';
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
import { toast } from 'react-hot-toast';

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
  const [avatarID, setAvatarID] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let registeredStatus = false;
  registeredStatus = useAppSelector(isRegistered);
  const registerError = useAppSelector(registeredError);

  useEffect(() => {
    switch (registerError) {
      case 'Username/Email already exists':
        setFormnumber(1);
        setUsername('');
        setEmail('');
        break;
    }
  }, [registerError]);

  useEffect(() => {
    if (registeredStatus) {
      toast.success('Registered Successfully :)');
      setFormnumber(1);
      navigate('/login', { replace: true });
      navigate(0);
    }
  }, [registeredStatus]);

  const handleRecaptcha = (value: string) => {
    if (!recaptchaCode) {
      setRecpatchaCode(value);
      setRecpatchaCode('value');
    }
  };

  const handleAvatarChange = (id: number) => {
    setAvatarID(id);
  };

  const handleSignUp = () => {
    if (recaptchaCode.length > 0) {
      handleRegistration();
    } else {
      toast.error('Invalid ReCaptcha');
    }
    handleRegistration();
  };
  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollege(e.target.value);
  };
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfullName(e.target.value);
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmpassword(e.target.value);
  };

  const handleNext = () => {
    if (formNumber == 1) {
      if (fullName.length < 4) {
        toast.error('Name should have atleast 5 characters');
      } else if (
        !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ) {
        toast.error('Invalid email');
      } else if (
        !password.match(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/,
        )
      ) {
        toast(
          'Password should contain atleast \n\tatleast 8 characters,\n\t1 UpperCase letter, \n\t1 Special Character, \n\t1 number',
        );
      } else if (password !== confirmPassword) {
        toast.error("Password and confirm password don't match");
      } else {
        setFormnumber(2);
      }
    } else if (formNumber == 2) {
      if (userName.length < 4) {
        toast.error('Username should have atleast 5 characters');
      } else if (college.length == 0) {
        toast.error('Please enter your college name');
      } else {
        setFormnumber(3);
      }
    }
  };

  const handlePrevious = () => {
    setFormnumber(formNumber - 1);
  };
  const handleStuff = () => {
    handleRecaptcha;
    handleSignUp;
  };

  const getCountryName = (code: string) => {
    const countryName = new Intl.DisplayNames(['en'], {
      type: 'region',
    }).of(code);

    return countryName ? countryName : 'INDIA';
  };
  const handleRegistration = async () => {
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
                handleFullNameChange={handleFullNameChange}
                handleEmailChange={handleEmailChange}
                fullName={fullName}
                email={email}
                register={true}
                handlePasswordChange={handlePasswordChange}
                handleConfirmPasswordChange={handleConfirmPasswordChange}
                password={password}
                confirmPassword={confirmPassword}
              />
            </>
          ) : formNumber === 2 ? (
            <>
              <UserCreditionals
                selectedCode={selected}
                userName={userName}
                handleUserNameChange={handleUserNameChange}
                handleFlagSelect={handleFlagSelect}
                formNumber={formNumber}
                handleCollegeChange={handleCollegeChange}
                college={college}
              />
            </>
          ) : formNumber === 3 ? (
            <>
              <div>
                <OtherDetails
                  formNumber={formNumber}
                  handleAvatarChange={handleAvatarChange}
                  isSignUp={true}
                />

                <div className="form-row d-flex justify-content-center my-1">
                  <div className="d-flex justify-content-center input-group">
                    <GoogleReCaptcha onVerify={handleRecaptcha} />
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
                  type="button"
                  onClick={handlePrevious}
                  className={styles.previousButton}
                >
                  <FontAwesomeIcon
                    className={styles.buttonIcon}
                    icon={faChevronLeft as IconProp}
                  />
                  <div className={styles.buttonText}> BACK</div>
                </button>
              ) : (
                <></>
              )}
            </div>
            <div>
              {formNumber < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className={styles.nextButton}
                >
                  <div className={styles.buttonText}>NEXT </div>
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
                  type="button"
                  onClick={handleStuff}
                  className={styles.signUpButton}
                >
                  <div className={styles.buttonText}>SIGN UP </div>
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
