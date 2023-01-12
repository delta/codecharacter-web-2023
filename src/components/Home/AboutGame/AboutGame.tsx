import styles from './AboutGame.module.css';
import { Container, Row, Col } from 'react-bootstrap';

export default function AboutGame(): JSX.Element {
  return (
    <div
      style={{
        backgroundImage: "url('/public/assets/Landing.png')",
      }}
    >
      <div className={styles.about}>
        <Container fluid className={styles.aboutcontainer}>
          <Row>
            <Col className={styles.col1}>
              <div className={styles.content}>
                CodeCharacter is a game but what game is it? That content your
                mom will come write or what?
              </div>
            </Col>
            <Col
              style={{
                paddingLeft: '3%',
              }}
            >
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
