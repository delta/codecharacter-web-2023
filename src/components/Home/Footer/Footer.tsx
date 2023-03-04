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
      <div>
        <div className={styles.container}>
          <div className={styles.heading}> Contact</div>
          <div>Subramanian: 9499926470</div>
          <div>Rinish: 9442129406</div>
          <div>Dipesh: 9654220462</div>
          <div>Vikash: 7050352720</div>
        </div>
      </div>
      <div>
        <div className={styles.container}>
          <div className={styles.heading}>Quick Links</div>
          <div>
            <NavLink className={styles.links} to="/dashboard">
              DashBoard
            </NavLink>
          </div>
          <div>
            <a
              href="https://codecharacter-docs-2022.vercel.app/"
              rel="noreferrer noopener"
              className={styles.links}
            >
              Documentation
            </a>
          </div>
          <div>
            <a
              href="https://discord.gg/ePQrhrSNk5"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.links}
            >
              Forum
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
