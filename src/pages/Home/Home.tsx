import Footer from '../../components/Home/Footer/Footer';
import Glitchtext from '../../components/Home/Glitchtext/Glitchtext';
import AboutGame from '../../components/Home/AboutGame/AboutGame';
import styles from './Home.module.css';
import { useRef } from 'react';

export default function Home(): JSX.Element {
  const Contentdiv = useRef<HTMLDivElement>(null);

  const handleClickArrow = () => {
    Contentdiv.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className={styles.mainContainer}>
      <div className={styles.jumbotron}>
        <Glitchtext value="Code Character" />
        <img
          onClick={handleClickArrow}
          className={styles.arrow}
          src="/assets/DownArrow.svg"
        ></img>
      </div>
      <div ref={Contentdiv}>
        <AboutGame />
      </div>
      <Footer />
      <div className={styles.delta}>
        <div>
          Made with <span className={styles.heart}>❤</span> by{' '}
          <a target="_blank" href="https://delta.nitt.edu/" rel="noreferrer">
            Delta Force
          </a>
        </div>
      </div>
    </main>
  );
}
