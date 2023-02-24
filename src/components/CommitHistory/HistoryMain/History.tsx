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
import {
  MapObj,
  changeHistoryEditorMap,
  mapImagesByCommits,
  addMapCommit,
} from '../../../store/historyEditor/historyEditorSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import styles from './History.module.css';
import CodeView from '../CodeMapViewbox/CodeView';
import { Col, Container, Row } from 'react-bootstrap';
import Toast, { toast } from 'react-hot-toast';
import { updateUserCode, changeLanguage } from '../../../store/editor/code';
import { useNavigate } from 'react-router-dom';

export default function History(): JSX.Element {
  const [SelectedButton, setSelectedButton] = useState('Code');
  const [completeCodeHistroy, setCodeHistory] = useState<CodeRevision[]>([]);
  const [completeMapHistory, setMapHistory] = useState<GameMapRevision[]>([]);
  const [mapFetched, setMapFetched] = useState<boolean>(false);
  const [codeFetched, setCodeFetched] = useState<boolean>(false);
  const [currentCode, setCurrentCode] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('');
  const [currentMap, setCurrentMap] = useState<MapObj>({
    map: [],
    mapImg: 'null',
  });
  const [currentCommitMessage, setCurrentCommitMessage] = useState<string>('');
  const mapImagesByCommitIds = useAppSelector(mapImagesByCommits);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const mapApi = new MapApi(apiConfig);

  useEffect(() => {
    const codeApi = new CodeApi(apiConfig);
    codeApi
      .getCodeRevisions()
      .then(codeResp => {
        setCodeFetched(true);
        setCodeHistory(codeResp);
      })
      .catch(codeError => {
        if (codeError instanceof ApiError) {
          Toast.error(codeError.message);
        }
      });

    mapApi
      .getMapRevisions()
      .then(mapResp => {
        setMapFetched(true);
        setMapHistory(mapResp);
      })
      .catch(mapError => {
        if (mapError instanceof ApiError) {
          Toast.error(mapError.message);
        }
      });
  }, []);

  const commitID = (id: string) => {
    setCurrentMap({
      map: currentMap.map,
      mapImg: '',
    });
    completeCodeHistroy.forEach(codeData => {
      if (codeData.id === id) {
        setCurrentCode(codeData.code);
        setCodeLanguage(codeData.language.toLowerCase());
        setCurrentCommitMessage(codeData.message);
      }
    });
    completeMapHistory.forEach(mapData => {
      if (mapData.id == id) {
        setCurrentCommitMessage(mapData.message);
        if (mapImagesByCommitIds.some(obj => obj.CommitId == id)) {
          setCurrentMap({
            map: JSON.parse(mapData.map),
            mapImg: mapImagesByCommitIds.find(obj => obj.CommitId === id)
              ?.Image as string,
          });
        } else {
          mapApi
            .getMapByCommitID(mapData.id)
            .then(resp => {
              setCurrentMap({
                map: JSON.parse(mapData.map),
                mapImg: resp.mapImage,
              });
              dispatch(
                addMapCommit({
                  CommitId: id,
                  Image: resp.mapImage,
                }),
              );
            })
            .catch(mapError => {
              if (mapError instanceof ApiError) {
                Toast.error(mapError.message);
              }
            });
        }
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
    } else if (
      SelectedButton == 'Map' &&
      currentMap.mapImg != '' &&
      currentMap.map.length !== 0
    ) {
      dispatch(changeHistoryEditorMap(currentMap));
      toast.success(` Loaded commit - ${currentCommitMessage}`);
      navigate('/mapdesigner', { replace: true });
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
            {(codeFetched && SelectedButton == 'Code') ||
            (mapFetched && SelectedButton == 'Map') ? (
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
            ) : currentMap.mapImg != '' ? (
              <img className={styles.mapImg} src={currentMap.mapImg} />
            ) : (
              <div className={styles.mapLoad}>Map image not found</div>
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
