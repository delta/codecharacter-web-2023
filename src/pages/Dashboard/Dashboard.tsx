import {
  CodeApi,
  Language,
  DailyChallengesApi,
  CurrentUserApi,
  CodeType,
} from '@codecharacter-2024/client';
import { RendererComponent } from '@codecharacter-2024/renderer';
import Toast from 'react-hot-toast';
import { CodeBlock, irBlack } from 'react-code-blocks';
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
import { Button, ButtonToolbar, Col, Form, Row } from 'react-bootstrap';
import SplitPane from 'react-split-pane';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import Editor from '../../components/Editor/Editor';
import Terminal from '../../components/Terminal/Terminal';
import {
  changeLanguage,
  initializeEditorStates,
  UserCode,
  UserLanguage,
  initializePvPEditorStates,
  updateEditorCodeState,
  GameType,
  CurrentGameType,
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
import {
  code1CommitIDChanged,
  code1CommitNameChanged,
  code2CommitIDChanged,
  code2CommitNameChanged,
  isPvPSelfMatchModalOpened,
} from '../../store/PvPSelfMatchMakeModal/PvPSelfMatchModal';
import { loggedIn, user } from '../../store/User/UserSlice';

import {
  IsSettingsOpen,
  IsInfoOpen,
  isSettingsOpened,
  isInfoOpened,
  Theme,
  IsCommitModalOpen,
  isCommitModalOpened,
} from '../../store/EditorSettings/settings';
import MapDesigner from '../../components/MapDesigner/MapDesigner';
import {
  dailyChallengeState,
  initializeDailyChallengeState,
  dailyChallengePageState,
  changeDcLanguage,
  dcCodeLanguage,
  dcCode,
  dcSimulation,
} from '../../store/DailyChallenge/dailyChallenge';
import Tour from '../../components/TourProvider/TourProvider';
import { EditorSteps } from '../../components/TourProvider/EditorSteps';
import { useNavigate } from 'react-router-dom';
import TourIntroModal from '../../components/TourIntroModal/TourIntroModal';
import { dcEnable } from '../../config/config';

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

  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const splitPaneState: SplitPaneState = {
      horizontalPercent,
      verticalPercent,
    };
    localStorage.setItem('splitPaneState', JSON.stringify(splitPaneState));
  }, [horizontalPercent, verticalPercent, mainContainerRef.current]);

  const userCode = useAppSelector(UserCode);
  const dailyChallengeCode = useAppSelector(dcCode);
  const dispatch = useAppDispatch();
  const dailyChallenge = useAppSelector(dailyChallengeState);
  const pageState = useAppSelector(dailyChallengePageState);
  const dailyChallengeSimulationState = useAppSelector(dcSimulation);
  const currentGameType = useAppSelector(CurrentGameType);
  const userLanguage =
    pageState == 'Dashboard'
      ? useAppSelector(UserLanguage)
      : useAppSelector(dcCodeLanguage);

  const codeAPI = new CodeApi(apiConfig);
  const dailyChallengeAPI = new DailyChallengesApi(apiConfig);
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
    if (dcEnable) {
      dailyChallengeAPI
        .getDailyChallenge()
        .then(response => {
          dispatch(initializeDailyChallengeState(response));
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
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

      codeAPI
        .getLatestCode(CodeType.Pvp)
        .then(response => {
          dispatch(initializePvPEditorStates(response));
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
  }, []);

  const languages: string[] = ['C++', 'Python', 'Java'];
  const modes: string[] = ['Normal', 'PvP'];

  const localStoreLanguageChose = localStorage.getItem('languageChose');
  const [languageChose, setLanguageChose] = useState(
    localStoreLanguageChose === null ? 'C++' : localStoreLanguageChose,
  );

  const handleLanguageChange = (language: string) => {
    switch (language) {
      case 'C++':
        switch (pageState) {
          case 'Dashboard':
            dispatch(changeLanguage('c_cpp'));
            break;
          case 'DailyChallenge':
            dispatch(changeDcLanguage('c_cpp'));
            break;
          default:
            dispatch(changeLanguage('c_cpp'));
        }
        setLanguageChose('C++');
        localStorage.setItem('languageChose', 'C++');
        break;
      case 'Python':
        pageState == 'Dashboard'
          ? dispatch(changeLanguage('python'))
          : dispatch(changeDcLanguage('python'));
        setLanguageChose('Python');
        localStorage.setItem('languageChose', 'Python');
        break;
      case 'Java':
        pageState == 'Dashboard'
          ? dispatch(changeLanguage('java'))
          : dispatch(changeDcLanguage('java'));

        setLanguageChose('Java');
        localStorage.setItem('languageChose', 'Java');
        break;
      default:
        pageState == 'Dashboard'
          ? dispatch(changeLanguage('c_cpp'))
          : dispatch(changeDcLanguage('c_cpp'));
    }
  };
  const handlePvPTake = () => {
    dispatch(
      updateEditorCodeState({ gameType: GameType.PVP, language: userLanguage }),
    );
  };
  const handlePvPClose = () => {
    dispatch(
      updateEditorCodeState({
        gameType: GameType.NORMAL,
        language: userLanguage,
      }),
    );
  };

  const handleSave = () => {
    let languageType: Language = Language.Cpp;
    if (userLanguage === 'c_cpp') languageType = Language.Cpp;
    else if (userLanguage === 'python') languageType = Language.Python;
    else if (userLanguage === 'java') languageType = Language.Java;

    codeAPI
      .updateLatestCode({
        codeType:
          pageState == 'Dashboard'
            ? currentGameType == GameType.NORMAL
              ? 'NORMAL'
              : 'PVP'
            : 'DAILY_CHALLENGE',
        code: pageState == 'Dashboard' ? userCode : dailyChallengeCode,
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
    if (currentGameType == GameType.NORMAL) {
      dispatch(isSelfMatchModalOpened(true));
      dispatch(codeCommitNameChanged('Current Code'));
      dispatch(codeCommitIDChanged(null));
      dispatch(mapCommitNameChanged('Current Map'));
      dispatch(mapCommitIDChanged(null));
    } else {
      dispatch(isPvPSelfMatchModalOpened(true));
      dispatch(code1CommitNameChanged('Current Code'));
      dispatch(code1CommitIDChanged(null));
      dispatch(code2CommitNameChanged('Current Code'));
      dispatch(code2CommitIDChanged(null));
    }
  }

  const isCommitModalOpen = useAppSelector(IsCommitModalOpen);

  function handleOpenCommitModal() {
    if (isCommitModalOpen === true) dispatch(isCommitModalOpened(false));
    else dispatch(isCommitModalOpened(true));
  }

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

  const handleSubmit = () => {
    let languageType: Language = Language.Cpp;
    if (userLanguage === 'c_cpp') languageType = Language.Cpp;
    else if (userLanguage === 'python') languageType = Language.Python;
    else if (userLanguage === 'java') languageType = Language.Java;

    codeAPI
      .updateLatestCode({
        codeType:
          pageState == 'Dashboard'
            ? currentGameType == GameType.NORMAL
              ? 'NORMAL'
              : 'PVP'
            : 'DAILY_CHALLENGE',
        code: pageState == 'Dashboard' ? userCode : dailyChallengeCode,
        lock: true,
        language: languageType,
      })
      .then(() => {
        if (pageState == 'Dashboard') {
          Toast.success('Code Submitted');
        }
      })
      .catch(err => {
        if (err instanceof ApiError) Toast.error(err.message);
      });

    if (pageState == 'DailyChallenge') {
      dailyChallengeAPI
        .createDailyChallengeMatch({
          value: dailyChallengeCode,
          language: languageType,
        })
        .then(() => {
          Toast.success('Daily Challenge Submitted');
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
  };

  const currentUserApi = new CurrentUserApi(apiConfig);

  const User = useAppSelector(user);
  const navigate = useNavigate();

  const setOpened = (opened: boolean) => {
    if (opened === false) {
      currentUserApi
        .updateCurrentUser({
          name: User.name,
          country: User.country,
          college: User.college,
          updateTutorialLevel: 'NEXT',
        })
        .then(() => {
          navigate('/mapdesigner', { replace: true });
        })
        .catch(err => {
          if (err instanceof ApiError) Toast.error(err.message);
        });
    }
  };

  return (
    <>
      <Tour setOpened={setOpened} steps={EditorSteps}>
        <main className={styles.mainContainer} ref={mainContainerRef}>
          <SplitPane
            split="vertical"
            onChange={(size: number) => {
              if (mainContainerRef.current) {
                setHorizontalPercent(
                  `${(
                    (size / mainContainerRef.current?.clientWidth) *
                    100
                  ).toFixed(0)}%`,
                );
              }
            }}
            size={horizontalPercent}
            allowResize={true}
            minSize={520}
          >
            <div className={styles.leftPane}>
              {pageState == 'Dashboard' || dailyChallenge.challType == 'MAP' ? (
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
                  id="TopBar"
                >
                  <div className={styles.mainDiv}>
                    <Col className={styles.toolbarColumn1} sm="1">
                      <Form.Select
                        className={styles.toolbarButton1}
                        value={
                          userLanguage == 'c_cpp'
                            ? 'C++'
                            : userLanguage.charAt(0).toUpperCase() +
                              userLanguage.slice(1)
                        }
                        onChange={e => handleLanguageChange(e.target.value)}
                        id="LanguageSelector"
                      >
                        {languages.map(language => (
                          <option value={language} key={language}>
                            {language}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <div className={styles.midDiv}>
                      <Col
                        className={styles.toolbarColumn}
                        sm="1"
                        style={{
                          marginLeft: pageState == 'Dashboard' ? 0 : '20%',
                        }}
                      >
                        <button
                          className={styles.toolbarButton}
                          onClick={handleSave}
                          ref={saveButtonRef}
                          id="SaveButton"
                        >
                          <FontAwesomeIcon
                            title="Save"
                            icon={faSave as IconProp}
                          />
                        </button>
                      </Col>
                      {pageState == 'Dashboard' ? (
                        <>
                          <Col className={styles.toolbarColumn} sm="1">
                            <button
                              className={styles.toolbarButton}
                              onClick={handleSimulate}
                              id="SimulateButton"
                            >
                              <FontAwesomeIcon
                                title="Simulate"
                                icon={faPlay as IconProp}
                              />
                            </button>
                          </Col>
                          <Col className={styles.toolbarColumn} sm="1">
                            <button
                              className={styles.toolbarButton}
                              onClick={handleOpenCommitModal}
                              id="CommitButton"
                            >
                              <FontAwesomeIcon
                                title="Commit"
                                icon={faCodeBranch as IconProp}
                              />{' '}
                            </button>
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}
                      <Col className={styles.toolbarColumn} sm="1">
                        <button
                          className={styles.toolbarButton}
                          onClick={handleSubmit}
                          ref={submitButtonRef}
                          id="SubmitButton"
                        >
                          <FontAwesomeIcon
                            title="Submit"
                            icon={faCloudUploadAlt as IconProp}
                          />{' '}
                        </button>
                      </Col>
                    </div>
                    <Col className={styles.toolbarColumn1} sm="1">
                      <Form.Select
                        className={styles.toolbarButton2}
                        value={
                          currentGameType == GameType.PVP ? 'PvP' : 'Normal'
                        }
                        onChange={e =>
                          e.target.value == 'PvP'
                            ? handlePvPTake()
                            : handlePvPClose()
                        }
                        id="ModeSelector"
                      >
                        {modes.map(mode => (
                          <option value={mode} key={mode}>
                            {mode}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </div>
                  <div>
                    <div className={styles.settingsIconDiv}>
                      <div className={styles.settingsIcon} id="Settings">
                        <FontAwesomeIcon
                          title={'Settings'}
                          icon={faGear as IconProp}
                          color={'#cbcbcb'}
                          onClick={handleOpenSettings}
                          className={styles.hoverIcon}
                        />
                      </div>
                      <div className={styles.settingsIcon} id="Shortcuts">
                        <FontAwesomeIcon
                          title={'Shortcuts'}
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
                      <FontAwesomeIcon
                        size={'sm'}
                        icon={faChevronLeft as IconProp}
                      />
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
              ) : (
                <>
                  <div className={styles.dcToolbar}>
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
                    <div className={styles.challName}>
                      {dailyChallenge.challName}
                    </div>
                    <div className={styles.infoIcon}>
                      <FontAwesomeIcon
                        title={'Shortcuts'}
                        icon={faCircleInfo as IconProp}
                        color={'#cbcbcb'}
                        onClick={handleOpenInfo}
                        className={styles.hoverIcon}
                      />
                    </div>
                  </div>
                </>
              )}
              <div className={styles.editorContainer} id="CodeEditor">
                {pageState == 'Dashboard' ||
                dailyChallenge.challType == 'MAP' ? (
                  <Editor
                    language={userLanguage}
                    page={pageState}
                    SaveRef={saveButtonRef}
                    SubmitRef={submitButtonRef}
                    gameType={currentGameType}
                  />
                ) : (
                  <CodeBlock
                    text={
                      languageChose == 'C++'
                        ? dailyChallenge.chall.cpp
                        : languageChose == 'Python'
                        ? dailyChallenge.chall.python
                        : dailyChallenge.chall.java
                    }
                    language={
                      languageChose == 'C++'
                        ? 'cpp'
                        : languageChose.toLowerCase()
                    }
                    showLineNumbers={true}
                    theme={irBlack}
                  />
                )}
              </div>
            </div>
            <SplitPane
              split="horizontal"
              size={
                pageState == 'Dashboard' || dailyChallengeSimulationState
                  ? verticalPercent
                  : '100%'
              }
              allowResize={
                pageState == 'Dashboard' || dailyChallengeSimulationState
                  ? true
                  : false
              }
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
              <div className={styles.rightPane} id="MAP">
                {pageState == 'Dashboard' || dailyChallengeSimulationState ? (
                  <RendererComponent />
                ) : dailyChallenge.challType == 'MAP' ? (
                  <>
                    <div className={styles.mapChallName}>
                      {dailyChallenge.challName}
                    </div>
                    <div className={styles.dcMap}>
                      <img
                        draggable={false}
                        src={dailyChallenge.chall.image}
                      ></img>
                    </div>
                  </>
                ) : (
                  <MapDesigner pageType={'DailyChallenge'} />
                )}
              </div>
              <div className={styles.rightPane} id="GameLogs">
                {pageState == 'Dashboard' || dailyChallengeSimulationState ? (
                  <Terminal />
                ) : (
                  <></>
                )}
              </div>
            </SplitPane>
          </SplitPane>
          <TourIntroModal />
        </main>
      </Tour>
    </>
  );
}
