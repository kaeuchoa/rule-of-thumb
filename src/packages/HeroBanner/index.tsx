import { ReactNode } from 'react';
import styles from './css/styles.module.css';

const HeroBanner = ({ children, pictureSrc }: { children: ReactNode, pictureSrc: string }) => {
  return (
    <header className={styles["hero"]}>
      <img
        className={styles["hero__background"]}
        srcSet={`${pictureSrc} 750w,${pictureSrc} 1440w`}
        sizes="(min-width: 750px) 1440px, 100vw"
        src={pictureSrc}
        alt="Pope Francis"
      />
      <div className={styles["max-centered"]}>
        {children}
      </div>
      <div className={styles["hero__closing-gauge"]}>
        <div className={styles["closing-gauge__left"]}>
          <span className={styles["closing-gauge__title"]}>closing in</span>
        </div>
        <div className={styles["closing-gauge__right"]}>
          <span className={styles["closing-gauge__number"]}>22</span>
          <span className={styles["closing-gauge__desc"]}>days</span>
        </div>
      </div>
    </header>
  );
};

export default HeroBanner;
