import styles from './user.module.css';

export default function UserDetails(props: user): JSX.Element {
  return (
    <div className={styles.formContainer}>
      <div>
        <input
          type="text"
          placeholder="NAME  &#xf007;"
          autoComplete="off"
          value={props.fullName}
          onChange={props.handleFullNameChange}
          className={styles.name}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="EMAIL  &#xf0e0;"
          value={props.email}
          className={styles.email}
          onChange={props.handleEmailChange}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="PASSWORD  &#xf084;"
          value={props.password}
          onChange={props.handlePasswordChange}
          className={styles.password}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="CONFIRM PASSWORD  &#xf084;"
          value={props.confirmPassword}
          onChange={props.handleConfirmPasswordChange}
          className={styles.confirmPassword}
        />
      </div>
    </div>
  );
}

interface user {
  submitFirst?: boolean;
  handleFullNameChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleUserNameChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleEmailChange?: React.ChangeEventHandler<HTMLInputElement>;
  handlePasswordChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleConfirmPasswordChange?: React.ChangeEventHandler<HTMLInputElement>;
  password?: string;
  passwordError?: boolean;
  confirmPassword?: string;
  confirmpasswordError?: boolean;
  fullName?: string;
  fullNameError?: boolean;
  userName?: string;
  userNameError?: boolean;
  email?: string;
  emailError?: boolean;
  register?: boolean;
}
