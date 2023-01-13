import styles from './AboutGame.module.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function AboutGame(): JSX.Element {
  return (
    <div
      style={{
        background: 'rgba(30, 30, 30, 0.87)',
      }}
    >
      <div className={styles.about}>
        <Container fluid className={styles.aboutcontainer}>
          <Row>
            <Col className={styles.col1}>
              <div className={styles.aboutImage}>
                <img
                  src="/assets/aboutPlaceholder.jpg"
                  style={{
                    objectFit: 'cover',
                  }}
                ></img>
              </div>
            </Col>
            <Col className={styles.col2}>
              <div className={styles.content}>
                The objective is to destroy and vanquish the opponent&apos;s
                territory by writing code and creating defenses via the in-game
                map. With progress and implementation of new competitive
                strategies, fight your way through, and dominate the top of the
                leaderboard.
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
