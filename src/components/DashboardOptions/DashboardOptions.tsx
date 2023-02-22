import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import styles from './DashboardOptions.module.css';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { ButtonGroup } from 'react-bootstrap';

interface dashboardoptions {
  image?: JSX.Element;
  onLogout?: React.MouseEventHandler<HTMLElement>;
}

const DashboardOptions = (props: dashboardoptions): JSX.Element => {
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
          <Dropdown.Item onClick={props.onLogout} className={styles.menuText}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DashboardOptions;
