import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CommitHistory from '../CommitTree/CommitHistroy';
import { apiConfig, ApiError } from '../../../api/ApiConfig';
import {
  CodeApi,
  CodeRevision,
  GameMapRevision,
  MapApi,
} from '@codecharacter-2023/client';
import { changeHistoryEditorMap } from '../../../store/historyEditor/historyEditorSlice';
import { useAppDispatch } from '../../../store/hooks';
import styles from './History.module.css';
import CodeView from '../CodeMapViewbox/CodeView';
import { Col, Container, Row } from 'react-bootstrap';
import Toast, { toast } from 'react-hot-toast';
import { updateUserCode, changeLanguage } from '../../../store/editor/code';
import { useNavigate } from 'react-router-dom';
import mapImage from '/assets/Map.jpeg';

export default function History(): JSX.Element {
  const [SelectedButton, setSelectedButton] = useState('Code');
  const [completeCodeHistroy, setCodeHistory] = useState<CodeRevision[]>([]);
  const [completeMapHistory, setMapHistory] = useState<GameMapRevision[]>([]);
  const [currentCode, setCurrentCode] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('');
  const [currentMap, setCurrentMap] = useState<Array<Array<number>>>([]);
  const [currentCommitMessage, setCurrentCommitMessage] = useState<string>('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const codeApi = new CodeApi(apiConfig);
    codeApi
      .getCodeRevisions()
      .then(codeResp => {
        setCodeHistory(
          codeResp.sort((a, b) => {
            if (a.createdAt < b.createdAt) return -1;
            else if (a.createdAt > b.createdAt) return 1;
            else return 0;
          }),
        );
      })
      .catch(codeError => {
        if (codeError instanceof ApiError) {
          Toast.error(codeError.message);
        }
      });

    const mapApi = new MapApi(apiConfig);
    mapApi
      .getMapRevisions()
      .then(mapResp => {
        setMapHistory(mapResp.reverse());
      })
      .catch(mapError => {
        if (mapError instanceof ApiError) {
          Toast.error(mapError.message);
        }
      });
  }, []);

  const commitID = (id: string) => {
    completeCodeHistroy.forEach(codeData => {
      if (codeData.id === id) {
        setCurrentCode(codeData.code);
        setCodeLanguage(codeData.language.toLowerCase());
        setCurrentCommitMessage(codeData.message);
      }
    });
    completeMapHistory.forEach(mapData => {
      if (mapData.id == id) {
        setCurrentMap(JSON.parse(mapData.map));
      }
    });
  };

  const changesEditorDetails = () => {
    if (SelectedButton == 'Code' && currentCode != '') {
      dispatch(
        updateUserCode({
          currentUserLanguage: codeLanguage === 'cpp' ? 'c_cpp' : codeLanguage,
          currentUserCode: currentCode,
        }),
      );
      dispatch(changeLanguage(codeLanguage === 'cpp' ? 'c_cpp' : codeLanguage));
      switch (codeLanguage) {
        case 'cpp':
          localStorage.setItem('languageChose', 'C++');
          break;
        case 'python':
          localStorage.setItem('languageChose', 'Python');
          break;
        case 'java':
          localStorage.setItem('languageChose', 'Java');
          break;
        default:
          dispatch(changeLanguage('c_cpp'));
      }
      toast.success(` Loaded commit - ${currentCommitMessage}`);
      navigate('/dashboard', { replace: true });
    } else if (SelectedButton == 'Map' && currentMap.length != 0) {
      dispatch(changeHistoryEditorMap(currentMap));
    }
  };

  return (
    <Container fluid className={styles.historyMain}>
      <div className={styles.buttonContainer}>
        <div className={styles.codeMapButton}>
          <ButtonGroup>
            <Button
              className={
                SelectedButton == 'Map' ? styles.whiteButton : styles.darkButton
              }
              onClick={() => {
                setSelectedButton('Map');
              }}
              variant="outline-light"
            >
              MAP
            </Button>
            <Button
              variant="outline-light"
              className={
                SelectedButton == 'Code'
                  ? styles.whiteButton
                  : styles.darkButton
              }
              onClick={() => {
                setSelectedButton('Code');
              }}
            >
              CODE
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Row className={styles.viewContainer}>
        <Col lg="4" style={{ marginLeft: '5%' }}>
          <div className={styles.completeTimeline}>
            {completeMapHistory && completeCodeHistroy ? (
              <CommitHistory
                commitID={commitID}
                commitHistoryDetails={
                  SelectedButton === 'Code'
                    ? completeCodeHistroy
                    : completeMapHistory
                }
                SelectedButton={SelectedButton}
              />
            ) : (
              <h1 className={styles.noCommitDataHeader}>Loading...</h1>
            )}
          </div>
        </Col>
        <Col lg="9" className={styles.codeView}>
          <div
            className={
              SelectedButton == 'Code' ? styles.codeBox : styles.mapBox
            }
          >
            {SelectedButton == 'Code' ? (
              <CodeView code={currentCode} codeLang={codeLanguage} />
            ) : (
              <img className={styles.mapImg} src={mapImage} />
            )}
          </div>
          <div className={styles.select}>
            <Button
              className={styles.selectButton}
              size="lg"
              onClick={changesEditorDetails}
              variant="outline-light"
            >
              LOAD COMMIT
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
