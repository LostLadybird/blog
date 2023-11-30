/* eslint-disable indent */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { registerUser, loginUser, updateUser } from '../service/API';

export const fetchUser = createAsyncThunk('user/fetchUser', async (userData) => {
  try {
    const response = await loginUser(userData);
    if (response.status === 422) throw new Error('Wrong email or password');
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchRegisterUser = createAsyncThunk('user/fetchRegisterUser', async (userData) => {
  try {
    const response = await registerUser(userData);
    if (response.status === 422) throw new Error('Username or email is already taken');
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchUpdatedUser = createAsyncThunk('user/fetchUpdatedUser', async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await updateUser(userData, token);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    status: null,
    isAuth: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.isAuth = true;
    },
    login(state) {
      state.isAuth = true;
    },
    logOut(state) {
      state.user = null;
      state.isAuth = false;
    },
    editUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('image', action.payload.image);
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [fetchRegisterUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchRegisterUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
    },
    [fetchRegisterUser.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [fetchUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [fetchUpdatedUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUpdatedUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
    },
    [fetchUpdatedUser.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});
export const { setUser, editUser, logOut, login, setError } = userSlice.actions;

export default userSlice.reducer;
