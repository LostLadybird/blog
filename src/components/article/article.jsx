import React from 'react';
import { useDispatch } from 'react-redux';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

import { fetchLike, fetchDislike } from '../../store/articlesSlice';

import styles from './article.module.scss';

const Article = (props) => {
  const { title, favoritesCount, favorited, tags, text, userName, createdAt, imgPath, slug } = props;

  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');

  const articlePath = `articles/${slug}`;

  const onLikeClick = async () => {
    if (token) {
      if (!favorited) {
        dispatch(fetchLike(slug));
      } else {
        dispatch(fetchDislike(slug));
      }
    }
  };

  return (
    <li>
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoWrapper}>
              <Link to={articlePath} className={styles.title}>
                {title}
              </Link>
              <button className={styles.like} onClick={onLikeClick}>
                {favoritesCount > 0 && token ? <FaHeart color="red" /> : <CiHeart />}
                {favoritesCount}
              </button>
            </div>
            <ul className={styles.tags}>
              {tags?.map((el, idx) => (
                <li className={styles.tag} key={idx + el}>
                  {el}
                </li>
              ))}
            </ul>
            <span className={styles.text}>
              <Markdown>{text}</Markdown>
            </span>
          </div>
          <div className={styles.user}>
            <div className={styles.authUser}>
              <div className={styles.userInfo}>
                <span className={styles.name}>{userName}</span>
                <span className={styles.data}>{formattedDate}</span>
              </div>
              <img className={styles.avatar} src={imgPath} alt="avatar"></img>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Article;
