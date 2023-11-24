/* eslint-disable indent */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { registerUser, loginUser, updateUser } from '../service/API'; //, updateUser

export const fetchUser = createAsyncThunk('user/fetchUser', async (userData) => {
  try {
    const response = await loginUser(userData);
    console.log('fetch user', response);
    if (response.status === 422) throw new Error('Wrong email or password');
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchUpdatedUser = createAsyncThunk('user/fetchUpdatedUser', async (userData) => {
  try {
    const token = localStorage.getItem('token');
    // console.log('TOKEN in slice', token, 'userData in slice:', userData);
    const response = await updateUser(userData, token);
    console.log('fetch updated user', response);
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
      console.log('set user', action.payload);
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.isAuth = true;
    },
    login(state) {
      state.isAuth = true;
      console.log('login');
    },
    logOut(state) {
      state.user = null;
      state.isAuth = false;
    },
    editUser(state, action) {
      // const { user } = action.payload;
      // console.log('user in edit slice', user);
      state.user = action.payload;
      // console.log('edit user action payload', action.payload);
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('image', action.payload.image);
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
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
// export const IsAuthCheck = (state) => Boolean(state.user.user);
export const { setUser, editUser, logOut, login } = userSlice.actions;

export default userSlice.reducer;
