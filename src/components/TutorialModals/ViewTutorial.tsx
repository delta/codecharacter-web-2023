import { Modal, Button } from 'react-bootstrap';
import styles from './TutorialModals.module.css';
import { TutorialProps } from './TutorialModalsTypes';

const ViewTutorial = (props: TutorialProps) => {
  return (
    <Modal
      show={props.show}
      onHide={props.handleTutorialClose}
      contentClassName={styles.tutorialModal}
    >
      <Modal.Header className={styles.tutorialModalHeader}>
        <Modal.Title className={styles.headerText}>Code Tutorials</Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={props.handleTutorialClose}
        ></button>
      </Modal.Header>
      <Modal.Body>
        Commander, we are here to help you started with some code tutorials of
        the game.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-light"
          className={styles.tutorialModalBtn}
          onClick={props.handleTutorialClose}
        >
          Not Right Now!
        </Button>
        <Button
          variant="outline-light"
          className={styles.tutorialModalBtn}
          onClick={props.handleTutorialTake}
        >
          Take Me There
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTutorial;
