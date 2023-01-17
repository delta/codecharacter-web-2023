import { Col, Modal, Row } from 'react-bootstrap';
import { IsInfoOpen } from '../../store/EditorSettings/settings';
import { isInfoOpened } from '../../store/EditorSettings/settings';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './EditorInfo.module.css';
import { shortcuts } from './data';

const EditorInfo = (): JSX.Element => {
  const isInfoOpen = useAppSelector(IsInfoOpen);

  const dispatch = useAppDispatch();

  const newLocal = 'fw-bold fs-3';
  return (
    <Modal
      show={isInfoOpen}
      centered
      onHide={() => dispatch(isInfoOpened(false))}
    >
      <Modal.Header className={styles.editorInfoHeader} closeButton>
        <Modal.Title className={newLocal}>Editor Shortcuts</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.editorInfoBody}>
        <Row>
          {shortcuts.map((shortcut, index) => (
            <Col key={index} xs={12} className={styles.InfoGroup}>
              <div className={styles.infoDiv}>
                <b>{shortcut.key}</b>
                <b> - {shortcut.description}</b>
              </div>
              <br />
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default EditorInfo;
