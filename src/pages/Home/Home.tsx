import Footer from '../../components/Home/Footer/Footer';
import Glitchtext from '../../components/Home/Glitchtext/Title';
import AboutGame from '../../components/Home/AboutGame/AboutGame';
import styles from './Home.module.css';
import { useRef } from 'react';
import downArrow from '../../../public/assets/DownArrow.svg';

export default function Home(): JSX.Element {
  const Contentdiv = useRef<HTMLDivElement>(null);

  const handleClickArrow = () => {
    Contentdiv.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.jumbotron}>
        <Glitchtext value="Code Character" />
        <div className={styles.arrowContainer}>
          <img
            onClick={handleClickArrow}
            className={styles.arrow}
            src={downArrow}
          ></img>
        </div>
      </div>
      <div ref={Contentdiv}>
        <AboutGame />
      </div>
      <Footer />
    </div>
  );
}
