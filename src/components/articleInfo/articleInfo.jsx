import React from 'react';
import Markdown from 'react-markdown';
import { format } from 'date-fns';

import styles from './articleInfo.module.scss';

const ArticleInfo = (props) => {
  console.log('props', props);
  const { title, description, body, tagList, favoritesCount, author, createdAt } = props;
  const { username, image } = author;

  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');

  const tags = (tags) => {
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

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardPreview}>
        <section className={styles.content}>
          <div className={styles.titleInfo}>
            <a className={styles.title}>{title}</a>
            <button className={styles.like}>🤍 {favoritesCount}</button>
          </div>
          <ul className={styles.tags}>{tags(tagList)}</ul>
          <p className={styles.description}>{description}</p>
        </section>
        <section className={styles.user}>
          <div className={styles.userInfo}>
            <div className={styles.infoWrapper}>
              <span className={styles.name}>{username}</span>
              <span className={styles.date}>{formattedDate}</span>
            </div>
            <img className={styles.avatar} src={image} alt="avatar" />
          </div>
        </section>
      </div>
      <span className={styles.cardText}>
        <Markdown>{body}</Markdown>
      </span>
    </div>
  );
};

export default ArticleInfo;
