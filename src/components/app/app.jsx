import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../layout/layout';
import SingleArticlePage from '../../pages/singleArticlePage';
import HomePage from '../../pages/homePage/homePage';
import LoginPage from '../../pages/loginPage';
import RegistrationPage from '../../pages/registrationPage';
import EditProfilePage from '../../pages/editProfilePage';
import CreateArticlePage from '../../pages/createArticlePage';
import EditArticlePage from '../../pages/editArticlePage';

import './app.css';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles/:slug" element={<SingleArticlePage />} />
          <Route path="sign-in" element={<LoginPage />} />
          <Route path="sign-up" element={<RegistrationPage />} />
          <Route path="profile" element={<EditProfilePage />} />
          <Route path="new-article" element={<CreateArticlePage />} />
          <Route path="articles/:slug/edit" element={<EditArticlePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
