import { Button, Col, Modal, Row } from 'react-bootstrap';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { CurrentUserApi } from '@codecharacter-2023/client';
import Toast from 'react-hot-toast';
import styles from './TourIntroModal.module.css';
import { useAppSelector } from '../../store/hooks';
import { user } from '../../store/User/UserSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';

const TourIntroModal = (): JSX.Element => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const currentUserApi = new CurrentUserApi(apiConfig);
  const User = useAppSelector(user);
  const navigate = useNavigate();

  const newLocal = 'fw-bold fs-3';

  const { setIsOpen } = useTour();

  const handleShowClick = () => {
    setIsOpen(true);
    setIsTourOpen(false);
    navigate('/dashboard');
  };

  const handleSkipClick = () => {
    setIsTourOpen(false);
    currentUserApi
      .updateCurrentUser({
        name: User.name,
        country: User.country,
        college: User.college,
        updateTutorialLevel: 'SKIP',
      })
      .then(() => {
        console.log('Tutorial level updated');
      })
      .catch(err => {
        if (err instanceof ApiError) Toast.error(err.message);
      });
  };

  useEffect(() => {
    currentUserApi.getCurrentUser().then(res => {
      if (res.isTutorialComplete === false && res.tutorialLevel === 1) {
        setIsTourOpen(true);
      }
    });
  }, []);

  return (
    <Modal show={isTourOpen} centered onHide={handleSkipClick}>
      <Modal.Header className={styles.tourIntroHeader} closeButton>
        <Modal.Title className={newLocal}>Welcome to CodeCharacter</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.tourIntroBody}>
        <Row>
          <Col>
            <p className={styles.tourIntroText}>
              This is a quick tour of the CodeCharacter Game. You can have a
              look at the game and then start playing.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className={styles.showBtn}>
            <Button
              variant="success"
              className={styles.btn}
              onClick={handleShowClick}
            >
              Show Me
            </Button>
          </Col>
          <Col className={styles.skipBtn}>
            <Button
              variant="secondary"
              className={styles.btn}
              onClick={handleSkipClick}
            >
              Skip
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default TourIntroModal;
