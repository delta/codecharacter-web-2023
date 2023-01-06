import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';

interface dashboardoptions {
  image?: JSX.Element;
  onLogout?: React.MouseEventHandler<HTMLElement>;
}

const DashboardOptions = (props: dashboardoptions): JSX.Element => {
  return (
    <DropdownButton
      size="lg"
      variant="dark"
      menuVariant="dark"
      id="dropdown-basic-button"
      title={props.image}
    >
      <Dropdown.Item as={Link} to="/profile">
        View Profile{' '}
      </Dropdown.Item>
      <Dropdown.Item onClick={props.onLogout}>Logout</Dropdown.Item>
    </DropdownButton>
  );
};

export default DashboardOptions;
