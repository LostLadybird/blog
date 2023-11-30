import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'antd';

import ArticleList from '../../components/articleList';
import { fetchArticles, changePage } from '../../store/articlesSlice'; //
import { allArticlesCount } from '../../service/API';
import { login } from '../../store/userSlice';

import './homePage.css';

const HomePage = () => {
  const articles = useSelector((state) => state.articles.articles);
  const { isAuth } = useSelector((state) => state.user);
  const page = useSelector((state) => state.articles.page);

  const token = localStorage.getItem('token');

  const [articlesCount, setArticlesCount] = useState(1);

  const dispatch = useDispatch();

  const fetchCountData = async () => {
    const res = await allArticlesCount();
    setArticlesCount(res);
  };

  useEffect(() => {
    if (token) {
      dispatch(login());
    }
    fetchCountData();
    dispatch(fetchArticles((page - 1) * 5));
  }, [dispatch, page, isAuth]);

  const onChangePagination = (page) => {
    dispatch(changePage(page));
  };

  const pagination = (
    <Pagination
      current={page}
      pageSize={5}
      total={articlesCount}
      onChange={(page) => onChangePagination(page)}
      showSizeChanger={false}
    />
  );

  return (
    <div className="main">
      <ArticleList articles={articles} />
      {articles.length > 0 && pagination}
    </div>
  );
};

export default HomePage;
