import { useState } from 'react';
import styles from './forgetpassword.module.css';
import { AuthApi } from '@codecharacter-2023/client';
import { ApiError, authConfig } from '../../../../../api/ApiConfig';
import { toast } from 'react-hot-toast';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface ForgetPasswordInterface {
  open?: boolean;
  handleForgetPassword: () => void;
}
const ForgetPassword = (props: ForgetPasswordInterface): JSX.Element => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSubmit = () => {
    const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(mailformat)) {
      toast.error('Enter valid email');
    } else {
      const authApi = new AuthApi(authConfig);
      authApi
        .forgotPassword({ email: email })
        .then(() => {
          props.handleForgetPassword();
          toast.success('Forget password email sent');
        })
        .catch(error => {
          if (error instanceof ApiError) {
            toast.error(error.message);
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
        contentClassName={styles.content}
        className={styles.modal}
      >
        <Modal.Header className={styles.editorInfoHeader}>
          <Modal.Title className={styles.headerText}>
            Forgot Password
          </Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={props.handleForgetPassword}
          ></button>
        </Modal.Header>

        <Modal.Body className={styles.editorInfoBody}>
          <div>
            <input
              type="name"
              placeholder="EMAIL  &#xf0e0;"
              value={email}
              className={styles.forgetPasswordModalInput}
              onChange={handleEmailSubmit}
            />
          </div>
          <Button
            className={styles.forgetPasswordModalbtn}
            size="lg"
            onClick={handleSubmit}
            variant="outline-light"
          >
            SUBMIT
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForgetPassword;
