import { Button, Col, Modal, Row } from 'react-bootstrap';
import { apiConfig, ApiError } from '../../api/ApiConfig';
import { CurrentUserApi } from '@codecharacter-2023/client';
import Toast from 'react-hot-toast';
import styles from './TourIntroModal.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { user } from '../../store/User/UserSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import {
  IsTourOver,
  IsTourReset,
  isTourResetChanged,
} from '../../store/DailyChallenge/dailyChallenge';

const TourIntroModal = (): JSX.Element => {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const currentUserApi = new CurrentUserApi(apiConfig);

  const User = useAppSelector(user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setIsOpen } = useTour();

  const isTourOver = useAppSelector(IsTourOver);
  const isTourReset = useAppSelector(IsTourReset);

  const handleShowClick = () => {
    setIsTourOpen(false);
    currentUserApi.getCurrentUser().then(res => {
      switch (res.tutorialLevel) {
        case 1:
          navigate('/dashboard', { replace: true });
          setIsOpen(true);
          break;
        case 2:
          navigate('/mapdesigner', { replace: true });
          break;
        case 3:
          navigate('/leaderboard', { replace: true });
          break;
        case 4:
          navigate('/history', { replace: true });
          break;
        case 5:
          navigate('/battletv', { replace: true });
          break;
        default:
          navigate('/dashboard', { replace: true });
          break;
      }
    });
  };

  const handleSkipClick = () => {
    setIsTourOpen(false);
    currentUserApi
      .updateCurrentUser({
        updateTutorialLevel: 'SKIP',
      })
      .then(() => {
        Toast.success('Tutorial skipped');
      })
      .catch(err => {
        if (err instanceof ApiError) Toast.error(err.message);
      });
  };

  const onHide = () => {
    setIsTourOpen(false);
  };

  useEffect(() => {
    if (isTourOver === false) {
      currentUserApi.getCurrentUser().then(res => {
        if (res.isTutorialComplete === false && res.tutorialLevel < 6) {
          setIsTourOpen(true);
          dispatch(isTourResetChanged(false));
        }
      });
    }
  }, [isTourOver, isTourReset]);

  return (
    <Modal show={isTourOpen} centered onHide={onHide}>
      <Modal.Header className={styles.tourIntroHeader}>
        <Modal.Title className={styles.headerText}>
          Welcome to CodeCharacter
        </Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={onHide}
        ></button>
      </Modal.Header>

      <Modal.Body className={styles.tourIntroBody}>
        <Row>
          <Col>
            <p className={styles.tourIntroText}>
              Hello, {User.name}! Welcome to CodeCharacter. Let&apos;s have a
              quick tour to get you started.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="outline-light"
              className={styles.showBtn}
              onClick={handleShowClick}
            >
              Proceed
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-light"
              className={styles.skipBtn}
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
