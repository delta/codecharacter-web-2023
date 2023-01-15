import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import styles from './forgetpassword.module.css';
import { AuthApi } from '@codecharacter-2023/client';
import { ApiError, authConfig } from '../../../../../api/ApiConfig';
import Toast, { toast } from 'react-hot-toast';

interface ForgetPasswordInterface {
  open?: boolean;
  handleForgetPassword?: () => void;
}
const ForgetPassword = (props: ForgetPasswordInterface): JSX.Element => {
  const [email, setEmail] = useState('');
  const [emailError, isemailError] = useState(false);

  const handleEmailSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (event.target.value.match(mailformat)) {
      isemailError(false);
    } else {
      isemailError(true);
    }
  };

  const handleSubmit = () => {
    const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailError) {
      toast.error('Enter valid email');
    }
    if (email.match(mailformat)) {
      const authApi = new AuthApi(authConfig);
      authApi
        .forgotPassword({ email: email })
        .then(() => {
          Toast.success('Forget password email sent');
        })
        .catch(error => {
          if (error instanceof ApiError) {
            Toast.error(error.message);
          }
        });
    }
  };
  return (
    <div>
      <Modal
        show={props.open}
        onHide={props.handleForgetPassword}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalContainer}>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              className={styles.email}
              onChange={handleEmailSubmit}
            />
          </div>{' '}
        </Modal.Body>

        <Modal.Footer className={styles.modalContainer}>
          <button
            className={styles.submitButton}
            onClick={() => {
              handleSubmit();
              if (props.handleForgetPassword != null)
                props.handleForgetPassword();
            }}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForgetPassword;
