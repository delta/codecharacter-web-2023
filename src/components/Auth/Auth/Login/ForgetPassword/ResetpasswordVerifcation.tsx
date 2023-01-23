import { useState } from 'react';
import styles from '../../auth.module.css';
import { ApiError, authConfig } from '../../../../../api/ApiConfig';
import { AuthApi } from '@codecharacter-2023/client';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast, { toast } from 'react-hot-toast';

function ResetpasswordVerification(): JSX.Element {
  const [confirmpasswordError, isconfirmpasswordError] = useState(false);
  const [passwordError, ispasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = () => {
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;

    if (password.match(passwordFormat)) {
      ispasswordError(false);
    } else {
      ispasswordError(true);
    }

    if (confirmPassword === password) {
      isconfirmpasswordError(false);
    } else {
      isconfirmpasswordError(true);
    }

    if (handleError()) {
      const authApi = new AuthApi(authConfig);
      authApi
        .resetPassword({
          token: token != null ? token : 'no-token',
          password: password,
          passwordConfirmation: confirmPassword,
        })
        .then(() => {
          Toast.success('Password Reset done successfully');
          navigate('/login', { replace: true });
        })
        .catch(error => {
          if (error instanceof ApiError) {
            Toast.error(error.message);
          }
        });
    }
  };

  const handleError = () => {
    if (passwordError) {
      toast.error('Password did not match the format');
    } else if (confirmpasswordError) {
      toast.error('Password and confirm password did not match');
    } else {
      return true;
    }
  };

  const handlePasswordSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value != null) {
      setPassword(event.target.value);
    }
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (event.target.value.toString().match(passwordFormat)) {
      ispasswordError(false);
    } else {
      ispasswordError(true);
    }
  };

  const handleConfirmSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    const passwordFormat =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;
    if (
      event.target.value.match(passwordFormat) &&
      event.target.value === password
    ) {
      isconfirmpasswordError(false);
    } else {
      isconfirmpasswordError(true);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.signUpText}>Reset Password</h2>

      <div className={styles.resetPasswordContainer}>
        <input
          type="password"
          placeholder="NEW PASSWORD"
          value={password}
          onChange={handlePasswordSubmit}
          className={styles.password}
        />
        <div>
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            className={styles.password}
            onChange={handleConfirmSubmit}
          />
        </div>
        <div></div>
        <button
          type="button"
          className={styles.resetPasswordButton}
          onClick={handleSubmit}
        >
          RESET PASSWORD{' '}
        </button>
      </div>
    </div>
  );
}
export default ResetpasswordVerification;
