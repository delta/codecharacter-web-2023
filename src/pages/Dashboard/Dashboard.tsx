import { CodeApi, Language } from '@codecharacter-2023/client';
import { RendererComponent } from '@codecharacter-2023/renderer';
import Toast from 'react-hot-toast';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronLeft,
  faChevronRight,
  faCloudUploadAlt,
  faCodeBranch,
  faPlay,
  faSave,
  faGear,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonToolbar,
  Col,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap';
import SplitPane from 'react-split-pane';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Editor from '../../components/Editor/Editor';
import Terminal from '../../components/Terminal/Terminal';
import {
  changeLanguage,
  initializeEditorStates,
  UserCode,
  UserLanguage,
} from '../../store/editor/code';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './Dashboard.module.css';
import './Dashboard.css';
import {
  codeCommitIDChanged,
  codeCommitNameChanged,
  isSelfMatchModalOpened,
  mapCommitIDChanged,
  mapCommitNameChanged,
} from '../../store/SelfMatchMakeModal/SelfMatchModal';
import { loggedIn } from '../../store/User/UserSlice';

import {
  IsSettingsOpen,
  IsInfoOpen,
  isSettingsOpened,
  isInfoOpened,
  Theme,
} from '../../store/EditorSettings/settings';

type SplitPaneState = {
  horizontalPercent: string;
  verticalPercent: string;
};

export default function Dashboard(): JSX.Element {
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const storedSplitPaneState: SplitPaneState | null = JSON.parse(
    localStorage.getItem('splitPaneState') || 'null',
  );

  const [dividerPosition, setDividerPosition] = useState(1);
  const [horizontalPercent, setHorizontalPercent] = useState(
    storedSplitPaneState?.horizontalPercent || '50%',
  );
  const [verticalPercent, setVerticalPercent] = useState(
    storedSplitPaneState?.verticalPercent || '50%',
  );

  const theme = useAppSelector(Theme);

  const updateDividerPosition = (position: number) => {
    setDividerPosition(position);
    if (position === 0) {
      setHorizontalPercent('0%');
    } else if (position === 1) {
      setHorizontalPercent('51%');
    } else if (position === 2) {
      setHorizontalPercent('100%');
    } else {
      position = 1;
      updateDividerPosition(position);
    }
  };

  useEffect(() => {
    const splitPaneState: SplitPaneState = {
      horizontalPercent,
      verticalPercent,
    };
    localStorage.setItem('splitPaneState', JSON.stringify(splitPaneState));
  }, [horizontalPercent, verticalPercent, mainContainerRef.current]);

  const userLanguage = useAppSelector(UserLanguage);
  const userCode = useAppSelector(UserCode);
  const dispatch = useAppDispatch();

  const codeAPI = new CodeApi(apiConfig);
  useEffect(() => {
    const cookieValue = document.cookie;
    const bearerToken = cookieValue.split(';');

    bearerToken.map(cookie => {
      if (cookie.trim().startsWith('bearer-token') != false) {
        const index = cookie.indexOf('=') + 1;
        const token = cookie.slice(index);
        localStorage.setItem('token', token);
        dispatch(loggedIn());
      }
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('firstTime') === null) {
      codeAPI
        .getLatestCode()
        .then(response => {
          dispatch(initializeEditorStates(response));
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        })
        .finally(() => localStorage.setItem('firstTime', 'false'));
    }
  }, []);

  const languages: string[] = ['C++', 'Python', 'Java'];

  const localStoreLanguageChose = localStorage.getItem('languageChose');
  const [languageChose, setLanguageChose] = useState(
    localStoreLanguageChose === null ? 'C++' : localStoreLanguageChose,
  );

  const [commitName, setCommitName] = useState('');
  const [trigerCommit, setTrigerCommit] = useState(false);

  const handleLanguageChange = (language: string) => {
    switch (language) {
      case 'C++':
        dispatch(changeLanguage('c_cpp'));
        setLanguageChose('C++');
        localStorage.setItem('languageChose', 'C++');
        break;
      case 'Python':
        dispatch(changeLanguage('python'));
        setLanguageChose('Python');
        localStorage.setItem('languageChose', 'Python');
        break;
      case 'Java':
        dispatch(changeLanguage('java'));
        setLanguageChose('Java');
        localStorage.setItem('languageChose', 'Java');
        break;
      default:
        dispatch(changeLanguage('c_cpp'));
    }
  };

  const handleSave = () => {
    let languageType: Language = Language.Cpp;
    if (userLanguage === 'c_cpp') languageType = Language.Cpp;
    else if (userLanguage === 'python') languageType = Language.Python;
    else if (userLanguage === 'java') languageType = Language.Java;

    codeAPI
      .updateLatestCode({
        code: userCode,
        lock: false,
        language: languageType,
      })
      .then(() => {
        Toast.success('Code Saved');
      })
      .catch(err => {
        if (err instanceof ApiError) Toast.error(err.message);
      });
  };

  function handleSimulate() {
    dispatch(isSelfMatchModalOpened(true));
    dispatch(codeCommitNameChanged('Current Code'));
    dispatch(codeCommitIDChanged(null));
    dispatch(mapCommitNameChanged('Current Map'));
    dispatch(mapCommitIDChanged(null));
  }

  const handleCommitNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitName(e.target.value);
  };

  const isSettingsOpen = useAppSelector(IsSettingsOpen);

  function handleOpenSettings() {
    if (isSettingsOpen === true) dispatch(isSettingsOpened(false));
    else dispatch(isSettingsOpened(true));
  }

  const isInfoOpen = useAppSelector(IsInfoOpen);

  function handleOpenInfo() {
    if (isInfoOpen === true) dispatch(isInfoOpened(false));
    else dispatch(isInfoOpened(true));
  }

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
        setTrigerCommit(false);
      })
      .catch(err => {
        if (err instanceof ApiError) Toast.error(err.message);
      });
  };

  const handleSubmit = () => {
    let languageType: Language = Language.Cpp;
    if (userLanguage === 'c_cpp') languageType = Language.Cpp;
    else if (userLanguage === 'python') languageType = Language.Python;
    else if (userLanguage === 'java') languageType = Language.Java;

    codeAPI
      .updateLatestCode({
        code: userCode,
        lock: true,
        language: languageType,
      })
      .then(() => {
        Toast.success('Code Submitted');
      })
      .catch(err => {
        if (err instanceof ApiError) Toast.error(err.message);
      });
  };

  return (
    <main className={styles.mainContainer} ref={mainContainerRef}>
      <SplitPane
        split="vertical"
        onChange={(size: number) => {
          if (mainContainerRef.current) {
            setHorizontalPercent(
              `${((size / mainContainerRef.current?.clientWidth) * 100).toFixed(
                0,
              )}%`,
            );
          }
        }}
        size={horizontalPercent}
        allowResize={true}
      >
        <div className={styles.leftPane}>
          <ButtonToolbar
            className={
              styles.toolbar +
              (theme == 'vs-dark'
                ? ' vs-dark'
                : theme == 'vs-light'
                ? ' vs'
                : ' hc-black')
            }
            as={Row}
          >
            <div className={styles.mainDiv}>
              <Col className={styles.toolbarColumn1} sm="1">
                <Form.Select
                  className={styles.toolbarButton1}
                  value={languageChose}
                  onChange={e => handleLanguageChange(e.target.value)}
                >
                  {languages.map(language => (
                    <option value={language} key={language}>
                      {language}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <div className={styles.midDiv}>
                <Col className={styles.toolbarColumn} sm="1">
                  <button
                    className={styles.toolbarButtonSave}
                    onClick={handleSave}
                  >
                    <FontAwesomeIcon icon={faSave as IconProp} /> Save
                  </button>
                </Col>
                <Col className={styles.toolbarColumn} sm="1">
                  <button
                    className={styles.toolbarButton}
                    onClick={handleSimulate}
                  >
                    <FontAwesomeIcon icon={faPlay as IconProp} /> Simulate
                  </button>
                </Col>
                <Col className={styles.toolbarColumn} sm="1">
                  <OverlayTrigger
                    // defaultShow={true}
                    show={trigerCommit}
                    trigger="click"
                    key={'bottom'}
                    placement={'bottom'}
                    rootClose
                    overlay={
                      <Popover>
                        <Popover.Header
                          as="h3"
                          className={styles.popOverHeader}
                        >
                          Enter commit message
                        </Popover.Header>
                        <Popover.Body className={styles.popOverBody}>
                          <Form.Control
                            onChange={handleCommitNameInput}
                            type="text"
                            placeholder="Commit message"
                          />
                          <br />
                          <Button onClick={handleCommit}>Commit</Button>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <button
                      className={styles.toolbarButton}
                      onClick={() => setTrigerCommit(!trigerCommit)}
                    >
                      <FontAwesomeIcon icon={faCodeBranch as IconProp} /> Commit
                    </button>
                  </OverlayTrigger>
                </Col>
                <Col className={styles.toolbarColumn} sm="1">
                  <button
                    className={styles.toolbarButton}
                    onClick={handleSubmit}
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt as IconProp} />{' '}
                    Submit
                  </button>
                </Col>
              </div>
            </div>
            <div>
              <div className={styles.settingsIconDiv}>
                <div className={styles.settingsIcon}>
                  <FontAwesomeIcon
                    title={'Settings'}
                    icon={faGear as IconProp}
                    color={'#cbcbcb'}
                    onClick={handleOpenSettings}
                    className={styles.hoverIcon}
                  />
                </div>

                <div className={styles.settingsIcon}>
                  <FontAwesomeIcon
                    title={'Shorcuts'}
                    icon={faCircleInfo as IconProp}
                    color={'#cbcbcb'}
                    onClick={handleOpenInfo}
                    className={styles.hoverIcon}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                className={styles.closeEditorButton}
                onClick={() => {
                  updateDividerPosition(dividerPosition - 1);
                }}
                variant="dark"
              >
                <FontAwesomeIcon size={'sm'} icon={faChevronLeft as IconProp} />
              </Button>
            </div>
            <div>
              <Button
                className={styles.closeRendererButton}
                onClick={() => {
                  updateDividerPosition(dividerPosition + 1);
                }}
                variant="dark"
              >
                <FontAwesomeIcon
                  size={'sm'}
                  icon={faChevronRight as IconProp}
                />
              </Button>
            </div>
          </ButtonToolbar>
          <div className={styles.editorContainer}>
            <Editor
              language={userLanguage}
              setTrigerCommit={setTrigerCommit}
            ></Editor>
          </div>
        </div>
        <SplitPane
          split="horizontal"
          size={verticalPercent}
          allowResize={true}
          onChange={(size: number) => {
            if (mainContainerRef.current) {
              setVerticalPercent(
                `${(
                  (size / mainContainerRef.current?.clientHeight) *
                  100
                ).toFixed(0)}%`,
              );
            }
          }}
        >
          <div className={styles.rightPane}>
            <RendererComponent />
          </div>
          <div className={styles.rightPane}>
            <Terminal />
          </div>
        </SplitPane>
      </SplitPane>
    </main>
  );
}
