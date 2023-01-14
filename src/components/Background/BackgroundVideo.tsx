import { useRef, useEffect } from 'react';
import styles from './BackgroundVideo.module.css';
import bgvideo from '/assets/bgEffect.mp4';

const Backgroundvideo = () => {
  const vid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (vid.current) {
      vid.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <video
      src={bgvideo}
      autoPlay
      loop
      muted
      className={styles.bgvideo}
      ref={vid}
    />
  );
};

export default Backgroundvideo;
