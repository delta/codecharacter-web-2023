import { NavLink } from 'react-router-dom';
import styles from './footer.module.css';

export default function Footer(): JSX.Element {
  return (
    <div className={styles.footerContainer}>
      <div>
        <div className={styles.credit}>
          <div className={styles.creditText}>
            Made with <span className={styles.heart}>❤</span> by{' '}
          </div>
          <div>
            <a
              target="_blank"
              href="https://delta.nitt.edu/"
              rel="noreferrer"
              className={styles.title}
            >
              Delta Force
            </a>
          </div>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.container}>
          <div className={styles.heading}> Contact</div>
          <div>Ezhil: +91 6381553859</div>
          <div>Ram Ganesh: +91 9025517379</div>
          <div>Vignesh: +91 6381196740</div>
        </div>
        <div className={styles.container}>
          <div className={styles.heading}>Quick Links</div>
          <div>
            <NavLink className={styles.links} to="/dashboard">
              DashBoard
            </NavLink>
          </div>
          <div>
            <a
              href="https://codecharacter-docs-2023.netlify.app/"
              rel="noreferrer noopener"
              target="_blank"
              className={styles.links}
            >
              Documentation
            </a>
          </div>
          <div>
            <a
              href="https://discord.gg/QcYMveUaGQ"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.links}
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
