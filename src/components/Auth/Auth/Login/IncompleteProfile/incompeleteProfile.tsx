import ReactFlagsSelect from 'react-flags-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
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
  const [userName, setUsername] = useState('');
  const [fullName, setfullName] = useState('');
  const [avatarId, setAvatarId] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollege(e.target.value);
  };

  const handleSubmit = () => {
    if (fullName.trim().length < 5) {
      toast.error('Name should be atleast 5 characters');
    } else if (userName.length < 5) {
      toast.error('Username should be atleast 5 characters');
    } else if (college.trim().length == 0) {
      toast.error('Please enter your college name');
    } else {
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

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setfullName(e.target.value);
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
            className={styles.flagText}
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
          formNumber={3}
          handleAvatarChange={setAvatarId}
          isSignUp={false}
        />

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.loginButton}
          >
            <div>LOGIN </div>
            <FontAwesomeIcon
              className={styles.buttonIcon}
              icon={faChevronRight as IconProp}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
export default IncompleteProfile;
