import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { setUser, fetchRegisterUser } from '../../store/userSlice';

import styles from './signUpForm.module.scss';

const SignUpForm = () => {
  const [alert, setAlert] = useState(false);
  const serverError = useSelector((state) => state.user.error);
  const { isAuth } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmitFn = async (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    try {
      dispatch(fetchRegisterUser(userData)).then((res) => {
        if (!res.payload) {
          setAlert(true);
        } else {
          dispatch(setUser(res.payload));
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    isAuth === true ? navigate('/') : null;
  }, [isAuth]);
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitFn)}>
        <h2 className={styles.title}>Create new account</h2>
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
              {...register('username', {
                required: 'Please, enter your name.',
                maxLength: {
                  value: 20,
                  message: 'Your name must be no more than 20 characters',
                },
                minLength: {
                  value: 3,
                  message: 'Your name must be at least 3 characters',
                },
              })}
            ></input>
            {serverError?.username && (
              <p className={styles.error}>
                {user.username} {serverError?.username}
              </p>
            )}
            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
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
              onKeyUp={() => {
                setValue('email', watch('email').toLowerCase());
              }}
              {...register('email', {
                required: 'Please, enter your email address',
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
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              placeholder="Password"
              style={errors.password && { outline: '1px solid #F5222D' }}
              {...register('password', {
                required: 'Please, enter your password.',
                maxLength: {
                  value: 40,
                  message: 'Your password must be no more than 40 characters',
                },
                minLength: {
                  value: 6,
                  message: 'Your password must be at least 6 characters',
                },
              })}
            ></input>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </li>
          <li className={styles.inputItem}>
            <label className={styles.label} htmlFor="repeatPassword">
              Repeat Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="repeatPassword"
              placeholder="Password"
              style={errors.repeatPassword && { outline: '1px solid #F5222D' }}
              {...register('repeatPassword', {
                required: 'Please, enter your password.',
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Passwords must match!';
                },
              })}
            ></input>
            {errors.repeatPassword && <p className={styles.error}>{errors.repeatPassword.message}</p>}
          </li>
        </ul>
        <div className={styles.agreement}>
          <label className={styles.checkLabel} htmlFor="agreement">
            <input
              className={styles.checkbox}
              type="checkbox"
              id="agreement"
              name="agreement"
              style={errors.agreement && { outline: '1px solid #F5222D' }}
              {...register('agreement', {
                required: 'You need to confirm user agreement',
              })}
            ></input>
            I agree to the processing of my personal information
          </label>
        </div>
        {errors.agreement && <p className={styles.error}>{errors.agreement.message}</p>}
        {alert && <p className={styles.error}>Username or Email is already taken!</p>}
        <button className={styles.submitButton} type="submit">
          Create
        </button>
        <span className={styles.signInLabel}>
          Already have an account?{' '}
          <Link to="/sign-in" className={styles.signInLink}>
            Sign In.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUpForm;
