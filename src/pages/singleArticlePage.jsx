import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import ArticleInfo from '../components/articleInfo';
import { fetchSingleArticle } from '../store/articlesSlice';

const singleArticlePage = () => {
  const article = useSelector((state) => state.articles.article);
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (slug) dispatch(fetchSingleArticle(slug));
  }, [dispatch, slug]);

  return <div>{article ? <ArticleInfo {...article} /> : <Skeleton style={{ marginTop: '20px' }} />}</div>;
};

export default singleArticlePage;
