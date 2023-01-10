import { useState } from 'react';
import { Form } from 'react-bootstrap';

import styles from './OtherDetails.module.css';
import { getAllAvatars } from '../../../../Avatar/Avatar';

export default function OtherDetails(props: user): JSX.Element {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const avatars = getAllAvatars();

  return (
    <div className={styles.formContainer}>
      <Form.Group className="mb-3" controlId="formBasicAvatar">
        <Form.Label>Choose your Avatar</Form.Label>
        <div>
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
    </div>
  );
}

interface user {
  selectedCode?: string;
  handleFlagSelect?: (code: string) => void;
  formNumber?: number;
  handleCollegeChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleAvatarChange: (id: number) => void;
  college?: string;
  collegeError?: boolean;
  submitThird?: boolean;
  register?: boolean;
}
