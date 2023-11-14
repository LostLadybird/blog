import React from 'react';

import Article from '../article/article';

import './articleList.css';

const ArticleList = ({ articles }) => {
  const elements = articles.map((item) => {
    return (
      <Article
        key={item.slug}
        slug={item.slug}
        title={item.title}
        likes={item.favoritesCount}
        tags={item.tagList}
        text={item.body}
        userName={item.author.username}
        createdAt={item.createdAt}
        imgPath={item.author.image}
      />
    );
  });
  return <ul className="articles">{elements}</ul>;
};

export default ArticleList;
