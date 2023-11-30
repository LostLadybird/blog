import React from 'react';
import { useDispatch } from 'react-redux';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

import { deleteArticle } from '../../service/API';
import { fetchLike, fetchDislike } from '../../store/articlesSlice';

import styles from './articleInfo.module.scss';

const ArticleInfo = (props) => {
  const { title, description, favorited, favoritesCount, body, tagList, author, createdAt, slug } = props;
  const { username, image } = author;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const isAuthor = () => {
    return user?.username === username;
  };

  const formattedDate = format(new Date(createdAt), 'MMMM d, yyyy');

  const onLikeClick = async () => {
    if (token) {
      if (!favorited) {
        dispatch(fetchLike(slug));
      } else {
        dispatch(fetchDislike(slug));
      }
    }
  };

  const onDelete = async () => {
    await deleteArticle(slug);
    navigate('/');
  };

  const cancel = () => {
    message.error('Click on No');
  };
  const onEdit = () => {
    navigate(`/articles/${slug}/edit`);
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardPreview}>
        <section className={styles.content}>
          <div className={styles.titleInfo}>
            <span className={styles.title}>{title}</span>
            <button className={styles.like} onClick={onLikeClick}>
              {favoritesCount && token ? <FaHeart color="red" /> : <CiHeart />}
              {favoritesCount}
            </button>
          </div>
          <ul className={styles.tags}>
            {tagList?.map((el, idx) => (
              <li className={styles.tag} key={idx + el}>
                {el}
              </li>
            ))}
          </ul>
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
          {isAuthor() ? (
            <ul className={styles.buttons}>
              <li>
                <Popconfirm
                  title="Delete the article"
                  description="Are you sure to delete this article?"
                  onConfirm={onDelete}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                  placement="right"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </li>
              <li>
                <button className={styles.editBtn} type="button" onClick={onEdit}>
                  Edit
                </button>
              </li>
            </ul>
          ) : null}
        </section>
      </div>
      <span className={styles.cardText}>
        <Markdown>{body}</Markdown>
      </span>
    </div>
  );
};

export default ArticleInfo;
