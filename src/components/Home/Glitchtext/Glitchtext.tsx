import styles from './Glitchtext.module.css';
import { useState, useEffect, useRef } from 'react';
export default function Glitchtext(prop: { value: string }): JSX.Element {
  const [placeholder, setPlaceholder] = useState<String>('_');

  const string: String = prop.value,
    index = useRef(0);

  useEffect(() => {
    function tick() {
      if (index.current == string.length - 1) {
        setPlaceholder(
          prev => prev.substring(0, prev.length - 1) + string[index.current],
        );
      } else {
        setPlaceholder(
          prev =>
            prev.substring(0, prev.length - 1) + string[index.current] + '_',
        );
      }
      index.current++;
    }
    if (index.current < string.length) {
      let addChar = setInterval(tick, 150);
      return () => {
        clearInterval(addChar);
        // console.log(placeholder);
      };
    } else {
      const reloop = setTimeout(() => {
        setPlaceholder('_');
        index.current = 0;
      }, 3000);
    }
  }, [placeholder]);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.glitchtext}>{placeholder}</div>
        <div className={styles.glitchtext}>{placeholder}</div>
        <div className={styles.glitchtext}>{placeholder}</div>
      </div>
    </div>
  );
}
