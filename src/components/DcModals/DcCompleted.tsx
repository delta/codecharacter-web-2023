import { Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './DcModals.module.css';
import { DcProps } from './DcModalTypes';

const DcCompleted = (props: DcProps) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      contentClassName={styles.dcmodal}
    >
      <Modal.Header className={styles.dcmodalHeader}>
        <Modal.Title>Daily Challenge</Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={props.handleClose}
        ></button>
      </Modal.Header>
      <Modal.Body>
        Woohoo, you&apos;ve completed today&apos;s Challenge!
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          className={styles.dcmodalBtn}
          onClick={props.handleTake}
        >
          View Latest Challenge
        </Button>
        <Button
          variant="outline-info"
          className={styles.dcmodalBtn}
          onClick={props.handleClose}
        >
          View Leaderboard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DcCompleted;
