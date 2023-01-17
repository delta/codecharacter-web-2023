import styles from './user.module.css';
import ReactFlagsSelect from 'react-flags-select';

export default function UserCreditionals(props: creditionals): JSX.Element {
  return (
    <div className={styles.formContainer}>
      <div>
        <input
          type="text"
          placeholder="USERNAME  &#xf007;"
          value={props.userName}
          onChange={props.handleUserNameChange}
          className={styles.username}
        />
      </div>
      <div className={styles.flagContainer}>
        <ReactFlagsSelect
          searchable
          selected={props.selectedCode != null ? props.selectedCode : 'IN'}
          onSelect={
            props.handleFlagSelect != null
              ? props.handleFlagSelect
              : () => {
                  return;
                }
          }
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="COLLEGE  &#xf19d;"
          value={props.college}
          onChange={props.handleCollegeChange}
          className={styles.collegeName}
        />
      </div>
    </div>
  );
}

interface creditionals {
  submitSecond?: boolean;
  selectedCode?: string;
  handleFlagSelect?: (code: string) => void;
  handleUserNameChange?: React.ChangeEventHandler<HTMLInputElement>;
  formNumber?: number;
  handleCollegeChange?: React.ChangeEventHandler<HTMLInputElement>;
  college?: string;
  userName?: string;
  userNameError?: boolean;
  collegeError?: boolean;
}
