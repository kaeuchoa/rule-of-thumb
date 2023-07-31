import React from 'react';
import styles from './css/styles.module.css'
import searchIcon from './assets/imgs/search.svg'

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className={styles["nav"]} role="navigation">
      <div className={styles["max-centered"]}>
        <h1 className={styles["nav__logo"]}>Rule of thumb.</h1>
        <button className={`${styles["nav__hamburger"]} ${styles["icon-button"]}`}>
          <svg width="25" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h25v4H0V0zm0 8h25v4H0V8zm0 8h25v4H0v-4z" fill="#FFF" fillRule="nonzero" />
          </svg>
        </button>
        <ul className={styles["nav__links"]}>
          <li>
            <a href="/">Past Trials</a>
          </li>
          <li>
            <a href="/">How It Works</a>
          </li>
          <li>
            <a href="/">Login / Sign Up</a>
          </li>
          <li>
            <form>
              <input className={styles["nav__search-input"]} aria-label="search" type="text" />
              <button className={`${styles["nav__search"]} ${styles["icon-button"]}`}>
                <img src={searchIcon} alt="search" />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
