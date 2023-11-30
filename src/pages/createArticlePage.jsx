import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CreateArticleForm from '../components/createArticleForm/createArticleForm';

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in');
    }
  }, [isAuth]);

  return <CreateArticleForm />;
};

export default CreateArticlePage;
