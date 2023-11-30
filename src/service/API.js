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

export const createArticle = async (data, token) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const post = await fetch(`${baseURL}/articles`, options);
    const response = await post.json();
    return response.article;
  } catch (error) {
    throw new Error(error.response);
  }
};

export const editArticle = async (data, slug, token) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const put = await fetch(`${baseURL}/articles/${slug}`, options);
    const response = await put.json();
    return response.article;
  } catch (error) {
    throw new Error(error.response);
  }
};

export const deleteArticle = async (slug) => {
  try {
    const token = localStorage.getItem('token');
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(`${baseURL}/articles/${slug}`, options);
  } catch (error) {
    throw new Error(error.response);
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
    if (post.status === 422) throw new Error('Username or email is already taken');
    const response = await post.json();
    localStorage.setItem('token', response.user.token);
    return response.user;
  } catch (error) {
    throw error.response;
  }
};

export const updateUser = async (userData, token) => {
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
    if (!post.ok) {
      throw new Error('failed to fetch');
    }
    const response = await post.json();
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
    const data = await response.json();
    return data;
  } catch (error) {
    throw error.response;
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
    throw new Error(error.response);
  }
};

export const setLike = async (slug, token) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    };
    const post = await fetch(`${baseURL}/articles/${slug}/favorite`, options);
    const response = await post.json();
    return response.article;
  } catch (error) {
    throw new Error(error.response);
  }
};

export const deleteLike = async (slug, token) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const onDelete = await fetch(`${baseURL}/articles/${slug}/favorite`, options);
    const response = await onDelete.json();
    return response.article;
  } catch (error) {
    throw new Error(error.response);
  }
};
