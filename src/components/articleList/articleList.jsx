import React from 'react';

import Article from '../article/article';

import './articleList.css';

const ArticleList = ({ articles }) => {
  const elements = articles?.map((item, i) => {
    return (
      <Article
        key={item.createdAt + i}
        slug={item.slug}
        title={item.title}
        favoritesCount={item.favoritesCount}
        favorited={item.favorited}
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
