import { Modal, Button } from 'react-bootstrap';
import styles from './DcModals.module.css';
import { DcAvailableProps } from './DcModalTypes';

const DcAvailable = (props: DcAvailableProps) => {
  return (
    <Modal
      show={props.showAvailable}
      onHide={props.handleCloseAvailable}
      contentClassName={styles.dcmodal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Daily Challenge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Commander we hope you are ready for today&apos;s Daily Challenge
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          className={styles.dcmodalBtn}
          onClick={props.handleCloseAvailable}
        >
          Not Right Now!
        </Button>
        <Button
          variant="outline-light"
          className={styles.dcmodalBtn}
          onClick={props.handleCloseAvailable}
        >
          Take Me There
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DcAvailable;
