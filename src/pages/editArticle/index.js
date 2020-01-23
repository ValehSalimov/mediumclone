import React, { useState, useEffect, useContext } from 'react';

import ArticleForm from '../../components/articleForm';
import useFetch from '../../hooks/useFetch';
import { Redirect } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/currentUser';

const EditArticle = ({ match }) => {
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [currentUserState] = useContext(CurrentUserContext);
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessfulSubmit, setIsSuccessfullSubmit] = useState(false);

  const handleSubmit = article => {
    doUpdateArticle({
      method: 'put',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) return;

    const { title, body, description, tagList } = fetchArticleResponse.article;

    setInitialValues({
      title,
      description,
      body,
      tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) return;

    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />
  }

  if (isSuccessfulSubmit) {
    return <Redirect to={`/articles/${slug}`} />;
  }

  return (
    <ArticleForm
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
