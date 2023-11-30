import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EditProfileForm from '../components/editProfileForm/editProfileForm';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in');
    }
  }, [isAuth]);

  return <EditProfileForm />;
};

export default EditProfilePage;
