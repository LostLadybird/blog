import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/layout';
import SingleArticle from '../../pages/singleArticle/singleArticle';
import HomePage from '../../pages/homePage/homePage';

import './app.css';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles/:slug" element={<SingleArticle />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
