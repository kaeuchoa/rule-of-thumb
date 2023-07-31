import styles from "./css/styles.module.css";
import bgPeople from './assets/imgs/bg-people.png' 
import bgPeople2x from './assets/imgs/bg-people.@2x.png' 

const CTABanner = () => {
  return (
    <aside className={`${styles["banner"]} ${styles["banner-bottom"]}`} role="doc-tip" aria-label="Submit a name">
      <img
        srcSet={`${bgPeople} 750w, ${bgPeople2x} 1440w`}
        sizes="(min-width: 750px) 1440px, 100vw"
        className={styles["banner__background"]}
        src="assets/img/bg-people.png"
        alt=""
        role="none"
      />
      <div className={styles["banner__left"]}>
        <h2 className={styles["banner__heading"]}>Is there anyone else you would want us to add?</h2>
      </div>
      <div className={styles["banner__right"]}>
        <button className={styles["banner__cta"]}>
          Submit a name
        </button>
      </div>
    </aside>
  );
};

export default CTABanner;
