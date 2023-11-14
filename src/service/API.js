const baseURL = 'https://blog.kata.academy/api';

export const getSingleArticle = async (slug) => {
  try {
    const response = await fetch(`${baseURL}/articles/${slug}`);
    const data = await response.json();
    // console.log('single article api', data);
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
