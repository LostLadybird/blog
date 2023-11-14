import React from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import styles from './article.module.scss';

const Article = (props) => {
  const { title, likes, tags, text, userName, createdAt, imgPath, slug } = props;

  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');

  const tagList = (tags) => {
    if (!tags) {
      return null;
    } else if (tags.length === 1) {
      return <li className={styles.tag}>{tags[0]}</li>;
    } else {
      tags.map((el, i) => {
        <li className={styles.tag} key={i + el}>
          {el}
        </li>;
      });
    }
  };

  const articlePath = `articles/${slug}`;
  return (
    <li>
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoWrapper}>
              <Link to={articlePath} className={styles.title}>
                {title}
              </Link>
              <button className={styles.like}>🤍 {likes}</button>
            </div>
            <ul className={styles.tags}>{tagList(tags)}</ul>
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
