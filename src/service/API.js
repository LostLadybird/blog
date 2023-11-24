const baseURL = 'https://blog.kata.academy/api';

export const getSingleArticle = async (slug) => {
  try {
    const response = await fetch(`${baseURL}/articles/${slug}`);
    const data = await response.json();
    return data.article;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const allArticlesCount = async () => {
  try {
    const res = await fetch(`${baseURL}/articles?limit=5&offset=5`);
    const data = await res.json();
    return data.articlesCount;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const registerUser = async (userData) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userData),
    };
    const post = await fetch(`${baseURL}/users`, options);
    const response = await post.json();
    // console.log('response in API', response.user);
    localStorage.setItem('token', response.user.token);
    return response.user;
  } catch (error) {
    throw error.response.errors;
  }
};

export const updateUser = async (userData, token) => {
  // console.log('data in api before post', userData, 'token:', token);
  try {
    const options = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    };
    const post = await fetch(`${baseURL}/user`, options);
    console.log('post response in api', post);
    if (!post.ok) {
      throw new Error('try again');
    }
    const response = await post.json();
    // console.log('update user in API', response);
    return response.user;
  } catch (error) {
    throw new Error(error.response);
  }
};

export const getUser = async (token) => {
  try {
    const response = await fetch(`${baseURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('get user response', response);
    const data = await response.json();
    console.log('get user API', data);
    return data;
  } catch (error) {
    throw error.response.errors;
  }
};

export const loginUser = async (userData) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userData),
    };
    const post = await fetch(`${baseURL}/users/login`, options);
    const response = await post.json();
    localStorage.setItem('token', response.user.token);
    return response.user;
  } catch (error) {
    throw new Error(error.response.message);
  }
};
