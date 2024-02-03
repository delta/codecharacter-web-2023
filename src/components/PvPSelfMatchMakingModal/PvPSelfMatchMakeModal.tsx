import { useEffect, useState } from 'react';
import styles from '../SelfMatchMakingModal/SelfMatchModalStyle.module.css';
import Button from 'react-bootstrap/Button';
import { FormGroup, Col, Container, Row, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  isPvPSelfMatchModalOpen,
  isPvPSelfMatchModalOpened,
  code1CommitID,
  code1CommitIDChanged,
  code1CommitNameChanged,
  code2CommitID,
  code2CommitIDChanged,
  code2CommitNameChanged,
  code1CommitName,
  code2CommitName,
} from '../../store/PvPSelfMatchMakeModal/PvPSelfMatchModal';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import {
  AuthApi,
  CodeApi,
  CodeRevision,
  MatchApi,
  MatchMode,
} from '@codecharacter-2024/client';
import Toast from 'react-hot-toast';

const PvPSelfMatchModal = (): JSX.Element => {
  const IsPvPSelfMatchModalOpen = useAppSelector(isPvPSelfMatchModalOpen);
  const Code1CommitID = useAppSelector(code1CommitID);
  const Code2CommitID = useAppSelector(code2CommitID);
  const Code1CommitName = useAppSelector(code1CommitName);
  const Code2CommitName = useAppSelector(code2CommitName);
  const dispatch = useAppDispatch();
  const [completeCodeHistory, setCodeHistory] = useState<CodeRevision[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      const authApi = new AuthApi(apiConfig);
      authApi
        .getAuthStatus()
        .then(res => {
          const { status } = res;
          if (status === 'AUTHENTICATED') {
            if (localStorage.getItem('token') != null) {
              const codeApi = new CodeApi(apiConfig);
              codeApi
                .getCodeRevisions()
                .then(codeResp => setCodeHistory(codeResp))
                .catch(error => {
                  if (error instanceof ApiError) Toast.error(error.message);
                });
            }
          }
        })
        .catch((e: Error) => {
          if (e instanceof ApiError) {
            Toast.error(e.message);
          }
        });
    }
  }, [IsPvPSelfMatchModalOpen]);

  function handleCode1CommitChange(selectedValue: string) {
    if (selectedValue === 'Current Player 1 Code') {
      dispatch(code1CommitNameChanged('Current Player 1 Code'));
      dispatch(code1CommitIDChanged(null));
    } else {
      const newCommit = completeCodeHistory.filter(
        codeCommit => codeCommit.message === selectedValue,
      );
      dispatch(code1CommitNameChanged(newCommit[0].message));
      dispatch(code1CommitIDChanged(newCommit[0].id));
    }
  }

  function handleCode2CommitChange(selectedValue: string) {
    if (selectedValue === 'Current Player 2 Code') {
      dispatch(code2CommitNameChanged('Current Player 2 Code'));
      dispatch(code2CommitIDChanged(null));
    } else {
      const newCommit = completeCodeHistory.filter(
        codeCommit => codeCommit.message === selectedValue,
      );
      dispatch(code2CommitNameChanged(newCommit[0].message));
      dispatch(code2CommitIDChanged(newCommit[0].id));
    }
  }

  function handleSimulate() {
    const matchAPI = new MatchApi(apiConfig);
    // figure out how to create pvp match
    matchAPI
      .createMatch({
        mode: MatchMode.Pvp,
        codeRevisionId: Code1CommitID,
        codeRevisionId2: Code2CommitID,
      })
      .catch(error => {
        if (error instanceof ApiError) Toast.error(error.message);
      });
    dispatch(isPvPSelfMatchModalOpened(false));
  }

  return (
    <Modal
      show={IsPvPSelfMatchModalOpen}
      centered
      contentClassName={styles.content}
      onHide={() => dispatch(isPvPSelfMatchModalOpened(false))}
    >
      <Modal.Header className={styles.selfMatchModalHeader}>
        <Modal.Title className={styles.headerText}>Self Match</Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => dispatch(isPvPSelfMatchModalOpened(false))}
        ></button>
      </Modal.Header>

      <Modal.Body className={styles.selfMatchModalBody}>
        <Container fluid>
          <Row>
            <Col xs={12} className={styles.selfMatchModalFormGroup}>
              <FormGroup controlId="code1CommitName">
                <div className={styles.selfMatchModalLabel}>
                  Code 1 Commit Name
                </div>
                <select
                  className={styles.selfMatchModalDropdown}
                  value={Code1CommitName}
                  onChange={e => handleCode1CommitChange(e.target.value)}
                >
                  <option
                    value={'Current Player 1 Code'}
                    key={'Current Player 1 Code'}
                    className={styles.dropdownOptions}
                  >
                    Current Code
                  </option>
                  {completeCodeHistory.map(codeCommit => (
                    <option
                      value={codeCommit.message}
                      key={codeCommit.message}
                      className={styles.dropdownOptions}
                    >
                      {codeCommit.message}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>

            <Col xs={12} className={styles.selfMatchModalFormGroup}>
              <FormGroup controlId="code2CommitName">
                <div className={styles.selfMatchModalLabel}>
                  Code 2 Commit Name
                </div>
                <select
                  className={styles.selfMatchModalDropdown}
                  value={Code2CommitName}
                  onChange={e => handleCode2CommitChange(e.target.value)}
                >
                  <option
                    value={'Current Player 2 Code'}
                    key={'Current Player 2 Code'}
                    className={styles.dropdownOptions}
                  >
                    Current Code
                  </option>
                  {completeCodeHistory.map(codeCommit => (
                    <option
                      value={codeCommit.message}
                      key={codeCommit.message}
                      className={styles.dropdownOptions}
                    >
                      {codeCommit.message}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <div>
                <Button
                  className={styles.selfMatchModalSimulateBtn}
                  size="lg"
                  onClick={handleSimulate}
                  variant="outline-light"
                >
                  SIMULATE
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PvPSelfMatchModal;
