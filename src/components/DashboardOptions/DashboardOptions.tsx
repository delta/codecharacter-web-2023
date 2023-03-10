import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DashboardOptions.module.css';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { ButtonGroup } from 'react-bootstrap';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { CurrentUserApi } from '@codecharacter-2023/client';
import Toast, { toast } from 'react-hot-toast';
import { useAppDispatch } from '../../store/hooks';
import {
  isTourOverChanged,
  isTourResetChanged,
} from '../../store/DailyChallenge/dailyChallenge';

interface dashboardoptions {
  image?: JSX.Element;
  onLogout?: React.MouseEventHandler<HTMLElement>;
}

const DashboardOptions = (props: dashboardoptions): JSX.Element => {
  const currentUserApi = new CurrentUserApi(apiConfig);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resetTutorials = () => {
    currentUserApi
      .updateCurrentUser({
        updateTutorialLevel: 'RESET',
      })
      .then(() => {
        navigate('/dashboard', { replace: true });
        toast.success('Tutorials reset successfully');
        dispatch(isTourResetChanged(true));
        dispatch(isTourOverChanged(false));
      })
      .catch(err => {
        if (err instanceof ApiError) Toast.error(err.message);
      });
  };

  return (
    <div className={styles.dropdown}>
      <Dropdown as={ButtonGroup}>
        <DropdownToggle size="lg" variant="dark" id="dropdown-basic-button">
          {props.image}{' '}
        </DropdownToggle>
        <Dropdown.Menu className={styles.menuBackground}>
          <Dropdown.Item as={Link} to="/profile" className={styles.menuText}>
            View Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={resetTutorials} className={styles.menuText}>
            Tutorials
          </Dropdown.Item>
          <Dropdown.Item onClick={props.onLogout} className={styles.menuText}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DashboardOptions;
