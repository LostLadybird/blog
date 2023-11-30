import React, { useState, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchCreateArticle, fetchEditArticle } from '../../store/articlesSlice';

import styles from './createArticleForm.module.scss';

const CreateArticleForm = () => {
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { articles } = useSelector((state) => state.articles);
  const article = articles.find((item) => item.slug === slug);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const onSubmitFn = async (data) => {
    const articleData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: data.tags.map((el) => el.name),
      },
    };
    try {
      if (slug) {
        dispatch(fetchEditArticle({ articleData, slug })).then((res) => {
          if (!res.payload) {
            setAlert(true);
          } else {
            navigate(`/articles/${res.payload.slug}`);
          }
        });
      } else {
        dispatch(fetchCreateArticle(articleData)).then((res) => {
          if (!res.payload) {
            setAlert(true);
          } else {
            navigate(`/articles/${res.payload.slug}`);
          }
        });
      }
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
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmitFn)}>
        <h2 className={styles.title}>{slug ? 'Edit article' : 'Create new article'}</h2>
        <ul className={styles.inputList}>
          <li>
            <label className={styles.label} htmlFor="title">
              Title
            </label>
            <input
              className={styles.input}
              type="text"
              id="title"
              placeholder="Title"
              defaultValue={article?.title}
              style={errors.title && { outline: '1px solid #F5222D' }}
              {...register('title', {
                required: 'Please, enter title',
              })}
            ></input>
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}
          </li>

          <li>
            <label className={styles.label} htmlFor="description">
              Short description
            </label>
            <input
              className={styles.input}
              type="text"
              id="description"
              placeholder="Title"
              defaultValue={article?.description}
              style={errors.description && { outline: '1px solid #F5222D' }}
              {...register('description', {
                required: 'Please, enter short description',
              })}
            ></input>
            {errors.description && <p className={styles.error}>{errors.description.message}</p>}
          </li>

          <li>
            <label className={styles.label} htmlFor="text">
              Text
            </label>
            <textarea
              className={styles.textarea}
              id="text"
              placeholder="Text"
              defaultValue={article?.body}
              style={errors.text && { outline: '1px solid #F5222D' }}
              {...register('text', {
                required: 'Please, enter some text',
              })}
            ></textarea>
            {errors.text && <p className={styles.error}>{errors.text.message}</p>}
          </li>

          <label className={styles.label} htmlFor="tags">
            Tags
          </label>

          {fields.length > 0 ? (
            fields.map((field, index) => (
              <section key={field.id}>
                <label htmlFor={`tags.${index}.name`}>
                  <input
                    className={styles.tagInput}
                    type="text"
                    placeholder="Tag"
                    defaultValue={article?.tagList}
                    {...register(`tags.${index}.name`, {
                      required: 'Please, add at least one tag',
                    })}
                  />
                </label>
                <button
                  className={styles.deleteButton}
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Delete
                </button>
                {index === fields.length - 1 && (
                  <button
                    className={styles.addButton}
                    type="button"
                    onClick={() => {
                      append({ name: '' });
                    }}
                  >
                    Add tag
                  </button>
                )}
                {index === fields.length - 1 && field.name === '' && (
                  <div className="warning-data">Перед отправкой формы, убедитесь что поле не пустое.</div>
                )}
              </section>
            ))
          ) : (
            <button
              className={styles.addButton}
              type="button"
              onClick={() => {
                append({ name: '' });
              }}
            >
              Add tag
            </button>
          )}
        </ul>
        {alert && <p className={styles.error}>Please, fill in the fields</p>}
        <button className={styles.btn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateArticleForm;
