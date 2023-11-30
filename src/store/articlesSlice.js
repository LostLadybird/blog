import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getSingleArticle, createArticle, editArticle, setLike, deleteLike } from '../service/API';

const baseURL = 'https://blog.kata.academy/api';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset) => {
  try {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${baseURL}/articles?limit=5&offset=${offset}`, options);
    if (!response.ok) throw new Error('Error');
    const data = await response.json();
    return data.articles;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchSingleArticle = createAsyncThunk('articles/fetchSingleArticle', async (slug) => {
  try {
    const response = await getSingleArticle(slug);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchCreateArticle = createAsyncThunk('articles/fetchCreateArticle', async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await createArticle(data, token);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchEditArticle = createAsyncThunk('articles/fetchEditArticle', async (data) => {
  try {
    const slug = data.slug;
    const articleData = data.articleData;
    const token = localStorage.getItem('token');
    const response = await editArticle(articleData, slug, token);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchLike = createAsyncThunk('articles/fetchLike', async (like) => {
  try {
    const token = localStorage.getItem('token');
    const response = await setLike(like, token);
    return response;
  } catch (error) {
    throw new Error(error);
  }
});

export const fetchDislike = createAsyncThunk('articles/fetchDislike', async (like) => {
  try {
    const token = localStorage.getItem('token');
    const response = await deleteLike(like, token);
    return response;
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
    location: null,
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
      state.location = 'homePage';
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [fetchSingleArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchSingleArticle.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.article = action.payload;
      state.location = 'singleArticle';
    },
    [fetchSingleArticle.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [fetchCreateArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCreateArticle.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.articles.push(action.payload);
    },
    [fetchCreateArticle.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [fetchEditArticle.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchEditArticle.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.articles.push(action.payload);
    },
    [fetchEditArticle.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [fetchLike.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchLike.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      if (state.location === 'homePage') {
        state.articles = state.articles.map((item) => (item?.slug === action.payload.slug ? action.payload : item));
      }
      if (state.location === 'singleArticle') {
        state.article = action.payload;
      }
    },
    [fetchLike.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
    [fetchDislike.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchDislike.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      if (state.location === 'homePage') {
        state.articles = state.articles.map((item) => (item?.slug === action.payload.slug ? action.payload : item));
      }
      if (state.location === 'singleArticle') {
        state.article = action.payload;
      }
    },
    [fetchDislike.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const { changePage, setLiked } = articlesSlice.actions;

export default articlesSlice.reducer;
