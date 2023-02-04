import styles from './Title.module.css';
import { useState, useEffect, useRef } from 'react';
export default function Glitchtext(prop: { value: string }): JSX.Element {
  const [displayedTitle, setDisplayedTitle] = useState<string>('');

  const completeTitle: string = prop.value,
    index = useRef(0);

  useEffect(() => {
    function addLetter() {
      setDisplayedTitle(
        displayedTitle.substring(0, displayedTitle.length - 1) +
          completeTitle[index.current] +
          (displayedTitle.length == completeTitle.length ? '' : '_'),
      );
      index.current++;
    }
    if (index.current < completeTitle.length) {
      const addChar = setInterval(addLetter, 150);
      return () => {
        clearInterval(addChar);
      };
    } else {
      const reloop = setTimeout(() => {
        setDisplayedTitle('');
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
