import { CodeApi, Language } from '@codecharacter-2023/client';
import React, { useState } from 'react';
import { Button, Form, FormControl, Modal, Row } from 'react-bootstrap';
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

  const newLocal = 'fw-bold fs-3';

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
      <Modal.Header className={styles.editorInfoHeader} closeButton>
        <Modal.Title className={newLocal}>Commit </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.editorInfoBody}>
        <Row>
          <Form>
            <FormControl
              type="text"
              placeholder="Enter Commit Message"
              value={commitName}
              className={styles.commitModalInput}
              onChange={handleCommitNameInput}
            />
            <Button className={styles.commitModalbtn} onClick={handleCommit}>
              Submit
            </Button>
          </Form>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default CommitModal;
