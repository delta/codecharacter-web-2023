import { Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './DcModals.module.css';
import { DcProps } from './DcModalTypes';

const DcAvailable = (props: DcProps) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      contentClassName={styles.dcmodal}
    >
      <Modal.Header closeButton className={styles.dcmodalHeader}>
        <Modal.Title>Daily Challenge</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Commander we hope you are ready for today&apos;s Daily Challenge
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-danger"
          className={styles.dcmodalBtn}
          onClick={props.handleClose}
        >
          Not Right Now!
        </Button>
        <Button
          variant="outline-light"
          className={styles.dcmodalBtn}
          onClick={props.handleTake}
        >
          Take Me There
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DcAvailable;
