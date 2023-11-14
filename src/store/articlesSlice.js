import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSingleArticle } from '../service/API';

const baseURL = 'https://blog.kata.academy/api';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset) => {
  try {
    const response = await fetch(`${baseURL}/articles?limit=5&offset=${offset}`);
    if (!response.ok) throw new Error('Error');
    const data = await response.json();
    console.log(data.articles);
    return data.articles;
  } catch (error) {
    throw new Error(error);
  }
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    article: null,
    status: null,
    error: null,
    page: 1,
  },
  reducers: {
    changePage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.articles = action.payload;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [getSingleArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [getSingleArticle.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.article = action.payload;
    },
    [getSingleArticle.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const { changePage } = articlesSlice.actions;

export default articlesSlice.reducer;
