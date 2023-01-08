import Footer from '../../components/Home/Footer/Footer';
import Glitchtext from '../../components/Home/Glitchtext/Glitchtext';
import AboutGame from '../../components/Home/AboutGame/AboutGame';
import styles from './Home.module.css';
import { useState } from 'react';

export default function Home(): JSX.Element {
  const [pageNum, setPageNum] = useState<Number>(1);
  return (
    <main className={styles.mainContainer}>
      <div className={styles.jumbotron}>
        <Glitchtext value="Code Character" />
        <img
          onClick={() => {
            setPageNum(1);
          }}
          className={styles.arrow}
          src="/assets/DownArrow.svg"
        ></img>
      </div>
      <AboutGame />
      <Footer />
      <div className={styles.delta}>
        <div>
          Made with <span className={styles.heart}>❤</span> by{' '}
          <a href="https://delta.nitt.edu/">Delta Force</a>
        </div>
      </div>
    </main>
  );
}
