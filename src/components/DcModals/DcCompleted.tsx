import { Modal, Button } from 'react-bootstrap';
import styles from './DcModals.module.css';
import { DcCompletedProps } from './DcModalTypes';

const DcCompleted = (props: DcCompletedProps) => {
  return (
    <Modal
      show={props.showCompleted}
      onHide={props.handleCloseCompleted}
      contentClassName={styles.dcmodal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Daily Challenge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Woohoo, youv&apos;e completed today&apos;s Challenges!
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          className={styles.dcmodalBtn}
          onClick={props.handleCloseCompleted}
        >
          Ok!
        </Button>
        <Button
          variant="outline-info"
          className={styles.dcmodalBtn}
          onClick={props.handleCloseCompleted}
        >
          View Leaderboard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DcCompleted;
