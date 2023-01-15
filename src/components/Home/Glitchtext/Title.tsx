import styles from './Title.module.css';
import { useState, useEffect, useRef } from 'react';
export default function Glitchtext(prop: { value: string }): JSX.Element {
  const [displayedTitle, setDisplayedTitle] = useState<string>('_');

  const completeTitle: string = prop.value,
    index = useRef(0);

  useEffect(() => {
    function addLetter() {
      if (index.current == completeTitle.length - 1) {
        setDisplayedTitle(
          prev =>
            prev.substring(0, prev.length - 1) + completeTitle[index.current],
        );
      } else {
        setDisplayedTitle(
          prev =>
            prev.substring(0, prev.length - 1) +
            completeTitle[index.current] +
            '_',
        );
      }
      index.current++;
    }
    if (index.current < completeTitle.length) {
      const addChar = setInterval(addLetter, 150);
      return () => {
        clearInterval(addChar);
      };
    } else {
      const reloop = setTimeout(() => {
        setDisplayedTitle('_');
        index.current = 0;
      }, 3000);
      return () => {
        clearTimeout(reloop);
      };
    }
  }, [displayedTitle]);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.glitchtext}>{displayedTitle}</div>
        <div className={styles.glitchtext}>{displayedTitle}</div>
        <div className={styles.glitchtext}>{displayedTitle}</div>
      </div>
    </div>
  );
}
