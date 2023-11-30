import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { editUser, fetchUpdatedUser } from '../../store/userSlice';

import styles from './editProfileForm.module.scss';

const EditProfileForm = () => {
  const [alert, setAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const serverError = useSelector((state) => state.user.error);
  const user = JSON.parse(localStorage.getItem('user'));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitFn = async (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        image: data.avatar === '' ? null : data.avatar,
        password: data.password,
      },
    };
    try {
      dispatch(fetchUpdatedUser(userData)).then((res) => {
        if (!res.payload) {
          setAlert(true);
        } else {
          dispatch(editUser(res.payload));
          navigate('/');
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <div className={styles.editWrapper}>
      <form className={styles.editForm} onSubmit={handleSubmit(onSubmitFn)}>
        <h2 className={styles.title}>Edit Profile</h2>
        <ul className={styles.inputList}>
          <li className={styles.inputItem}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              className={styles.input}
              type="text"
              id="username"
              placeholder="Username"
              style={errors.username && { outline: '1px solid #F5222D' }}
              defaultValue={user?.username}
              {...register('username', {
                required: 'Please, enter you name',
                minLength: {
                  value: 3,
                  message: 'Your name must be at least 3 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Your name must be no more than 20 characters',
                },
              })}
            ></input>
            {serverError?.username && (
              <p className={styles.error}>
                {user?.username} {serverError?.username}
              </p>
            )}
            {errors?.username && <p className={styles.error}>{errors.username.message}</p>}
          </li>
          <li className={styles.inputItem}>
            <label className={styles.label} htmlFor="email">
              Email address
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Email address"
              style={errors.email && { outline: '1px solid #F5222D' }}
              defaultValue={user?.email}
              {...register('email', {
                required: 'Please, enter you email',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Your email address is not correct',
                },
              })}
            ></input>
            {serverError?.email && (
              <p className={styles.error}>
                {user.email} {serverError?.email}
              </p>
            )}
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </li>
          <li className={styles.inputItem}>
            <label className={styles.label} htmlFor="password">
              New password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="New password"
              style={errors.password && { outline: '1px solid #F5222D' }}
              {...register('password', {
                required: 'Please, enter your password.',
                minLength: {
                  value: 6,
                  message: 'Your password must be at least 6 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Your password must be no more than 40 characters',
                },
              })}
            ></input>
            {serverError?.password && (
              <p className={styles.error}>
                {user.password} {serverError?.password}
              </p>
            )}
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </li>
          <li className={styles.inputItem}>
            <label className={styles.label} htmlFor="avatar">
              Avatar image (url)
            </label>
            <input
              className={styles.input}
              type="text"
              id="avatar"
              placeholder="Avatar image"
              defaultValue={user?.avatar}
              style={errors.avatar && { outline: '1px solid #F5222D' }}
              {...register('avatar', {
                pattern: {
                  value:
                    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                  message: 'Your url link is not correct',
                },
              })}
            ></input>
            {errors.avatar && <p className={styles.error}>{errors.avatar.message}</p>}
            {alert && <p className={styles.error}>Please, enter new Password</p>}
          </li>
        </ul>
        <button className={styles.submitButton} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
