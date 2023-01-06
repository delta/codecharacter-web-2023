import Footer from '../../components/Home/Footer/Footer';
import Glitchtext from '../../components/Home/Glitchtext/Glitchtext';
import Particle from '../../components/Home/Particles/Particle';
import Rows from '../../components/Home/Row/Rows';
import styles from './Home.module.css';
import { useState } from 'react';
import MatrixBackground from '../../components/MatrixEffect/Matrix';

export default function Home(): JSX.Element {
  const [pageNum, setPageNum] = useState<Number>(1);
  return (
    <main className={styles.mainContainer}>
      {pageNum == 1 && (
        <div className={styles.jumbotron}>
          <MatrixBackground />
          <Glitchtext value="Code Character" />
          <img
            onClick={() => {
              setPageNum(1);
            }}
            className={styles.arrow}
            src="/assets/UnderlineHeading.svg"
          ></img>
        </div>
      )}
      {pageNum == 1 && (
        <>
          <Rows />
          <Footer />
          <div className={styles.delta}>
            <div>
              Made with <span className={styles.heart}>❤</span> by{' '}
              <a href="https://delta.nitt.edu/">Delta Force</a>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
