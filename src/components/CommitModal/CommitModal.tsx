import { CodeApi, Language } from '@codecharacter-2023/client';
import React, { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { UserCode, UserLanguage } from '../../store/editor/code';

import {
  IsCommitModalOpen,
  isCommitModalOpened,
} from '../../store/EditorSettings/settings';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Toast from 'react-hot-toast';

import styles from './CommitModal.module.css';

const CommitModal = (): JSX.Element => {
  const isCommitModalOpen = useAppSelector(IsCommitModalOpen);
  const userLanguage = useAppSelector(UserLanguage);
  const userCode = useAppSelector(UserCode);

  const dispatch = useAppDispatch();

  const codeAPI = new CodeApi(apiConfig);

  const [commitName, setCommitName] = useState('');

  const handleCommitNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitName(e.target.value);
  };

  const handleCommit = () => {
    let languageType: Language = Language.Cpp;
    if (userLanguage === 'c_cpp') languageType = Language.Cpp;
    else if (userLanguage === 'python') languageType = Language.Python;
    else if (userLanguage === 'java') languageType = Language.Java;

    codeAPI
      .createCodeRevision({
        code: userCode,
        message: commitName,
        language: languageType,
      })
      .then(() => {
        Toast.success('Code Committed');
        setCommitName('');
        dispatch(isCommitModalOpened(false));
      })
      .catch(err => {
        if (err instanceof ApiError) Toast.error(err.message);
      });
  };

  return (
    <Modal
      show={isCommitModalOpen}
      centered
      onHide={() => dispatch(isCommitModalOpened(false))}
    >
      <Modal.Header className={styles.editorInfoHeader}>
        <Modal.Title className={styles.headerText}>Commit </Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => dispatch(isCommitModalOpened(false))}
        ></button>
      </Modal.Header>

      <Modal.Body className={styles.editorInfoBody}>
        <Row>
          <Form>
            <input
              type="text"
              placeholder="Enter Commit Message"
              value={commitName}
              className={styles.commitModalInput}
              onChange={handleCommitNameInput}
            />
            <Button
              className={styles.commitModalbtn}
              size="lg"
              onClick={handleCommit}
              variant="outline-light"
            >
              SUBMIT
            </Button>
          </Form>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CommitModal;
