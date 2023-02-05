import { useState } from 'react';

import styles from './OtherDetails.module.css';
import { getAllAvatars } from '../../../../Avatar/Avatar';

export default function OtherDetails(props: user): JSX.Element {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const avatars = getAllAvatars();

  return (
    <div className={styles.formContainer}>
      <div className={styles.wrapper}>
        <div className={styles.avatarHeader}> CHOOSE AN AVATAR </div>
        <div className={styles.avatarContainer}>
          {avatars.map((avatar, index: number) => (
            <div
              key={index}
              className={`${styles.avatar} ${
                selectedAvatar === avatar.id ? styles.avatarSelected : ''
              }`}
              onClick={() => {
                setSelectedAvatar(avatar.id);
                props.handleAvatarChange(avatar.id);
              }}
            >
              <img className={styles.avatarImg} src={avatar.url} alt="avatar" />
            </div>
          ))}
        </div>
        {props.isSignUp && (
          <div className={styles.termsContainer}>
            By Signing up, you agree to Google Recaptcha{' '}
            <span
              onClick={() =>
                window.open('https://www.google.com/intl/en/policies/terms/')
              }
            >
              Terms of Service
            </span>{' '}
            &amp;{' '}
            <span
              onClick={() =>
                window.open('https://www.google.com/intl/en/policies/privacy/')
              }
            >
              Privacy Policy
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface user {
  formNumber?: number;
  handleAvatarChange: (id: number) => void;
  isSignUp?: boolean;
}
