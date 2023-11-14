import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

import ArticleInfo from '../../components/articleInfo';
import { getSingleArticle } from '../../service/API';

const SingleArticle = () => {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (slug) {
          const response = await getSingleArticle(slug);
          setArticle(response);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchArticle();
  }, [slug]);

  return <div>{article ? <ArticleInfo {...article} /> : <Skeleton style={{ marginTop: '20px' }} />}</div>;
};

export default SingleArticle;
