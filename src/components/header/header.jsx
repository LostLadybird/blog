import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import noAvatar from '../../images/no-avatar.png';
import { logOut } from '../../store/userSlice';

import styles from './header.module.scss';

const Header = () => {
  // const { isAuth } = useSelector((state) => state.user);
  // console.log('isAuth:', isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const avatar = localStorage.getItem('image') ? localStorage.getItem('image') : noAvatar;

  console.log('user', user);

  const onLogOut = () => {
    dispatch(logOut());
    navigate('/');
    localStorage.clear();
  };

  const userMenu = (
    <div className={styles.userMenu}>
      <Link to="createArticle" className={styles.createArticle}>
        Create Article
      </Link>
      <Link to="profile" className={styles.userInfo}>
        <span className={styles.name}>{user?.username}</span>
        <img className={styles.avatar} alt="avatar" src={avatar} />
      </Link>
      <button className={styles.logOut} onClick={onLogOut}>
        Log Out
      </button>
    </div>
  );
  const authMenu = (
    <div className={styles.authMenu}>
      <Link to="sign-in" className={styles.signIn}>
        Sign In
      </Link>
      <Link to="sign-up" className={styles.signUp}>
        Sign Up
      </Link>
    </div>
  );
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.title}>
        RealWorld Blog
      </Link>
      {user?.token ? userMenu : authMenu}
    </div>
  );
};

export default Header;
