import { Col, Modal, Row } from 'react-bootstrap';

import { IsInfoOpen, isInfoOpened } from '../../store/EditorSettings/settings';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './EditorInfo.module.css';
import { shortcuts } from './data';
import {
  dailyChallengePageState,
  dcDescription,
} from '../../store/DailyChallenge/dailyChallenge';

const EditorInfo = (): JSX.Element => {
  const homePageState = useAppSelector(dailyChallengePageState);
  const dailyChallengeDescription = useAppSelector(dcDescription);

  const isInfoOpen = useAppSelector(IsInfoOpen);

  const dispatch = useAppDispatch();

  return (
    <Modal
      show={isInfoOpen}
      centered
      contentClassName={styles.content}
      onHide={() => dispatch(isInfoOpened(false))}
    >
      <Modal.Header className={styles.editorInfoHeader}>
        {homePageState == 'Dashboard' || homePageState == 'PvP' ? (
          <Modal.Title className={styles.headerText}>
            Editor Shortcuts
          </Modal.Title>
        ) : (
          <Modal.Title className={styles.headerText}>
            DC Description
          </Modal.Title>
        )}
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => dispatch(isInfoOpened(false))}
        ></button>
      </Modal.Header>

      <Modal.Body className={styles.editorInfoBody}>
        {homePageState == 'Dashboard' || homePageState == 'PvP' ? (
          <Row>
            {shortcuts.map((shortcut, index) => (
              <Col key={index} xs={12} className={styles.InfoGroup}>
                <div className={styles.infoDiv}>
                  <b>{shortcut.key}</b>
                  <b>{shortcut.description}</b>
                </div>
                <br />
              </Col>
            ))}
          </Row>
        ) : (
          <div className={styles.dcDescription}>
            {dailyChallengeDescription}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditorInfo;
