import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { setUser, fetchUser } from '../../store/userSlice';

import styles from './signInForm.module.scss';

const SignInForm = () => {
  const [alert, setAlert] = useState(false);
  const { isAuth } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitFn = async (data) => {
    const userData = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    try {
      dispatch(fetchUser(userData)).then((res) => {
        console.log('sign in', res);
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
  });

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitFn)}>
        <h2 className={styles.title}>Sign In</h2>
        <ul className={styles.inputList}>
          <li className={styles.inputItem}>
            <label className={styles.label} htmlFor="email">
              Email Address
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
                  message: 'Email address is not correct',
                },
              })}
            ></input>
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
              })}
            ></input>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            {alert && <p className={styles.error}>Email or password is incorrect — try again!</p>}
          </li>
        </ul>
        <button className={styles.submitButton} type="submit">
          Sign In
        </button>
        <span className={styles.signUpLabel}>
          Don`t have an account?{' '}
          <Link to="/sign-up" className={styles.signUpLink}>
            Sign Up.
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignInForm;
