import { Modal, Button } from 'react-bootstrap';
import styles from './DcModals.module.css';
import { DcProps } from './DcModalTypes';

const DcAvailable = (props: DcProps) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      contentClassName={styles.dcmodal}
    >
      <Modal.Header className={styles.dcmodalHeader}>
        <Modal.Title className={styles.headerText}>Daily Challenge</Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={props.handleClose}
        ></button>
      </Modal.Header>
      <Modal.Body>
        Commander, we hope you are ready for today&apos;s daily challenge.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-light"
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
