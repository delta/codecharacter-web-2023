import { useEffect, useState } from 'react';
import {
  MapDesignerComponent,
  MapDesignerUtils,
} from '@codecharacter-2023/map-designer';
import { MapApi, DailyChallengesApi } from '@codecharacter-2023/client';
import Toast from 'react-hot-toast';
import styles from './MapDesigner.module.css';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { Modal, Container, Row } from 'react-bootstrap';

interface MapDesignerProps {
  pageType: 'MapDesigner' | 'DailyChallenge';
}

export default function MapDesigner(props: MapDesignerProps): JSX.Element {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [commitModalShow, setCommitModalShow] = useState<boolean>(false);
  const [commitName, setCommitName] = useState<string>('');
  const [commitModalError, setCommitModalError] = useState<string>('');
  const [stagedMap, setStagedMap] = useState<Array<Array<number>>>();

  let mapImg: string;

  type ButtonType = 'save' | 'submit' | 'commit';
  const mapAPI = new MapApi(apiConfig);
  const dcAPI = new DailyChallengesApi(apiConfig);
  useEffect(() => {
    mapAPI
      .getLatestMap(
        props.pageType == 'MapDesigner' ? 'NORMAL' : 'DAILY_CHALLENGE',
      )
      .then(mp => {
        setStagedMap(JSON.parse(mp.map));
      });
  }, []);

  const compressImage = (button: ButtonType) => {
    const ccMapDesigner = document.getElementsByTagName('cc-map-designer')[0];
    const parentDiv = ccMapDesigner.shadowRoot?.getElementById('map-designer');
    const mapCanvas: HTMLCanvasElement =
      parentDiv?.firstChild as HTMLCanvasElement;
    const imgUrl = mapCanvas.toDataURL();
    const newCanvas = document.createElement('canvas');
    const newCanvasContext = newCanvas.getContext('2d');
    const base_image = new Image();
    newCanvas.width = 935;
    newCanvas.height = 615;
    base_image.onload = () => {
      newCanvasContext?.drawImage(
        base_image,
        0,
        0,
        newCanvas.width,
        newCanvas.height,
      );
      mapImg = newCanvas.toDataURL();
      handleButtonClick(button);
    };
    base_image.src = imgUrl;
  };

  const closeModal = () => setModalShow(false);
  const closeCommitModal = () => {
    setCommitModalError('');
    setCommitName('');
    setCommitModalShow(false);
  };
  const openCommitModal = () => {
    closeModal();
    setCommitModalShow(true);
  };
  const handleCommitName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitName(e.target.value);
  };
  const handleButtonClick = (button: ButtonType) => {
    if (!stagedMap) return;
    switch (button) {
      case 'save':
        closeModal();
        mapAPI
          .updateLatestMap({
            mapType:
              props.pageType == 'MapDesigner' ? 'NORMAL' : 'DAILY_CHALLENGE',
            mapImage: mapImg,
            map: JSON.stringify(stagedMap),
            lock: false,
          })
          .then(() => {
            Toast.success('Map Saved');
          })
          .catch(error => {
            if (error instanceof ApiError) {
              Toast.error(error.message);
            }
          });
        break;
      case 'submit':
        closeModal();
        mapAPI
          .updateLatestMap({
            mapType:
              props.pageType == 'MapDesigner' ? 'NORMAL' : 'DAILY_CHALLENGE',
            mapImage: mapImg,
            map: JSON.stringify(stagedMap),
            lock: true,
          })
          .then(() => {
            if (props.pageType == 'MapDesigner') {
              Toast.success('Map Submitted');
            }
          })
          .catch(error => {
            if (error instanceof ApiError) {
              Toast.error(error.message);
            }
          });
        if (props.pageType == 'DailyChallenge') {
          dcAPI
            .createDailyChallengeMatch({
              value: JSON.stringify(stagedMap),
            })
            .then(() => {
              Toast.success('Daily Challenge submitted succesfully');
            })
            .catch(error => {
              if (error instanceof ApiError) {
                Toast.error(error.message);
              }
            });
        }
        break;
      case 'commit':
        if (!commitName) {
          setCommitModalError('Commit name cannot be empty!');
          return;
        }
        closeCommitModal();
        mapAPI
          .createMapRevision({
            mapType: 'NORMAL',
            mapImage: mapImg,
            map: JSON.stringify(stagedMap),
            message: commitName,
          })
          .then(() => {
            Toast.success('Map Commit Created');
          })
          .catch(error => {
            if (error instanceof ApiError) {
              Toast.error(error.message);
            }
          });
        break;
    }
    setStagedMap(undefined);
    closeModal();
  };

  useEffect(() => {
    MapDesignerUtils.setLocalStorageKey(
      props.pageType == 'MapDesigner'
        ? 'cc-map-designer-map'
        : 'dc-map-designer-map',
    );
  }, [props.pageType]);

  const saveMapCallback = (map: Array<Array<number>>) => {
    setModalShow(true);
    setStagedMap(map);
  };

  return (
    <>
      <div className={styles.mapDesignerContainer}>
        <MapDesignerComponent
          saveMapCallback={saveMapCallback}
          readonly={false}
        />
      </div>
      <Modal show={modalShow} centered onHide={closeModal}>
        <Modal.Header className={styles.modalHeader} closeButton>
          <Modal.Title className="fw-bold fs-3">Save Map</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalContent}>
          <Container fluid>
            <Row>
              <p className={styles.contentP}>
                <span>SAVE</span> : Save map only.
              </p>
            </Row>
            <Row>
              <p className={styles.contentP}>
                <span>SUBMIT</span> :{' '}
                {props.pageType == 'MapDesigner'
                  ? 'Save map and submit to Leaderboard.'
                  : 'Save map and submit against the challenge'}
              </p>
            </Row>
            {props.pageType == 'MapDesigner' ? (
              <Row>
                <p className={styles.contentP}>
                  <span>COMMIT</span> : Create a commit revision with the
                  current map.
                </p>
              </Row>
            ) : (
              <></>
            )}
          </Container>
          <Container fluid className={styles.buttonRow}>
            <button
              className={styles.modalButton}
              onClick={() => {
                compressImage('save');
              }}
            >
              Save
            </button>
            <button
              className={styles.modalButton}
              onClick={() => {
                compressImage('submit');
              }}
            >
              Submit
            </button>
            {props.pageType == 'MapDesigner' ? (
              <button className={styles.modalButton} onClick={openCommitModal}>
                Commit
              </button>
            ) : (
              <></>
            )}
          </Container>
        </Modal.Body>
      </Modal>
      <Modal show={commitModalShow} centered onHide={closeCommitModal}>
        <Modal.Header className={styles.modalHeader} closeButton>
          <Modal.Title className="fw-bold fs-2">Commit Name</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalContent}>
          <Row>
            <input
              className={styles.commitNameInput}
              onChange={handleCommitName}
            ></input>
          </Row>
          <p className={styles.commitModalError}>{commitModalError}</p>
          <div className={styles.buttonRow}>
            <button
              className={styles.modalButton}
              onClick={() => {
                compressImage('commit');
              }}
            >
              Create Map Commit
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
