import React, { useEffect, useContext, useState } from 'react';

import useFetch from '../../hooks/useFetch';
import { Link, Redirect } from 'react-router-dom';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import TagList from '../../components/tagList';
import { CurrentUserContext } from '../../contexts/currentUser';
import ArticleMeta from './components/article-meta';

const Article = props => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;

  const [
    {
      response: fetchArticleResponse,
      error: fetchArticleError,
      isLoading: fetchArticleIsLoading,
    },
    doFetch,
  ] = useFetch(apiUrl);

  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(
    apiUrl
  );

  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
      return false;
    }

    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    });
    console.log('de');
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) return;

    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) {
    return <Redirect to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <ArticleMeta
              info={{
                username: fetchArticleResponse.article.author.username,
                image: fetchArticleResponse.article.author.image,
                createdAt: fetchArticleResponse.article.createdAt,
                slug: fetchArticleResponse.article.slug,
              }}
              onDelete={deleteArticle}
              isAuthor={isAuthor}
            />
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
              <hr />
            </div>
            <div className="col-xs-12">
              <div className="article-actions ">
                <ArticleMeta
                  info={{
                    username: fetchArticleResponse.article.author.username,
                    image: fetchArticleResponse.article.author.image,
                    createdAt: fetchArticleResponse.article.createdAt,
                    slug: fetchArticleResponse.article.slug,
                  }}
                  onDelete={deleteArticle}
                  isAuthor={isAuthor}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
