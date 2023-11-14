import React from 'react';
import { Link } from 'react-router-dom';

import styles from './header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.title}>
        RealWorld Blog
      </Link>
      <div className={styles.auth}>
        <button className={styles.signIn}>Sign In</button>
        <button className={styles.signUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
