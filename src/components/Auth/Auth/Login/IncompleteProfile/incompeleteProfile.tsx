import ReactFlagsSelect from 'react-flags-select';
import styles from '../../../Auth/Login/IncompleteProfile/incompleteProfile.module.css';
import OtherDetails from '../../Register/FormDetails/OtherDetails';
import { useState } from 'react';
import { CurrentUserApi } from '@codecharacter-2023/client';
import { apiConfig, ApiError } from '../../../../../api/ApiConfig';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../store/hooks';
import Toast, { toast } from 'react-hot-toast';
import { getUserDetailsAction } from '../../../../../store/User/UserSlice';

function IncompleteProfile(): JSX.Element {
  const [college, setCollege] = useState('');
  const [selected, setSelected] = useState('IN');
  const [collegeError, iscollegeError] = useState(false);
  const [submitThird, isSubmitThird] = useState(false);
  const [userName, setUsername] = useState('');
  const [userNameError, isuserNameError] = useState(false);
  const [fullName, setfullName] = useState('');
  const [fullNameError, isfullNameError] = useState(false);
  const [avatarId, setAvatarId] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCollege = () => {
    isSubmitThird(true);
    if (college.trim().length == 0 || college.trim() == '') {
      iscollegeError(true);
    } else {
      iscollegeError(false);
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

  const handleError = () => {
    if (fullNameError) {
      toast.error('Name should be atleast 5 characters');
    } else if (userNameError) {
      toast.error('Username should be atleast 5 characters');
    } else if (collegeError) {
      toast.error('Please enter your college name');
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    handleFullname();
    handleUsername();
    handleCollege();
    if (handleError()) {
      const currentUserapi = new CurrentUserApi(apiConfig);
      currentUserapi
        .completeUserProfile({
          username: userName,
          name: fullName,
          country: getCountryName(selected),
          college: college,
          avatarId: avatarId,
        })
        .then(() => {
          dispatch(getUserDetailsAction());
          Toast.success('Profile completed');
          navigate('/login', { replace: true });
        })
        .catch(error => {
          if (error instanceof ApiError) {
            Toast.error(error.message);
          }
        });
    }
  };
  const handleFlagSelect = (code: string) => {
    setSelected(code);
  };
  const getCountryName = (code: string) => {
    const countryName = new Intl.DisplayNames(['en'], {
      type: 'region',
    }).of(code);

    return countryName ? countryName : 'INDIA';
  };

  const handleUsername = () => {
    if (userName.trim().length < 5 || userName.length < 5) {
      isuserNameError(true);
    } else {
      isuserNameError(false);
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (submitThird) {
      if (e.target.value.trim().length < 5 || userName.length < 4) {
        isuserNameError(true);
      } else {
        isuserNameError(false);
      }
    }
  };
  const handleFullname = () => {
    if (fullName.trim().length < 5) {
      isfullNameError(true);
    } else {
      isfullNameError(false);
    }
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfullName(e.target.value);
    if (submitThird) {
      if (e.target.value.trim().length < 5 || fullName.length < 4) {
        isfullNameError(true);
      } else {
        isfullNameError(false);
      }
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div>
        <h1 className={styles.titleContainer}>Profile Completion</h1>
        <h5 className={styles.subTitle}>
          Please complete your profile to start playing
        </h5>
      </div>

      <div className={styles.formContainer}>
        <input
          type="text"
          placeholder="NAME  &#xf007;"
          autoComplete="off"
          value={fullName}
          onChange={handleFullNameChange}
          className={styles.name}
        />
        <input
          type="text"
          placeholder="USERNAME  &#xf007;"
          value={userName}
          onChange={handleUserNameChange}
          className={styles.username}
        />
        <div className={styles.flagContainer}>
          <ReactFlagsSelect
            searchable
            selected={selected != null ? selected : 'IN'}
            onSelect={
              handleFlagSelect != null
                ? handleFlagSelect
                : () => {
                    return;
                  }
            }
          />
        </div>
        <input
          type="text"
          placeholder="COLLEGE  &#xf19d;"
          value={college}
          onChange={handleCollegeChange}
          className={styles.collegeName}
        />

        <OtherDetails
          handleFlagSelect={handleFlagSelect}
          formNumber={3}
          submitThird={submitThird}
          register={false}
          handleAvatarChange={setAvatarId}
        />

        <div className={styles.loginButtonContainer}>
          <button className={styles.loginButton} onClick={handleSubmit}>
            LOGIN{' '}
          </button>
        </div>
      </div>
    </div>
  );
}
export default IncompleteProfile;
