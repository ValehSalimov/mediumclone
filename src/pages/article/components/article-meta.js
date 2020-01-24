import React from 'react';
import { Link } from 'react-router-dom';

const ArticleMeta = ({info: {username, image, createdAt, slug}, onDelete, isAuthor}) => {

  return (
    <div className="article-meta">
      <Link to={`/profiles/${username}`}>
        <img src={image} alt="" />
      </Link>
      <div className="info">
        <Link to={`/profiles/${username}`}>
          {username}
        </Link>
        <span className="date">{createdAt}</span>
      </div>
      {isAuthor() && (
        <span>
          <Link
            className="btn btn-outline-secondary btn-sm"
            to={`/articles/${slug}/edit`}
          >
            <i className="ion-edit"></i>
            Edit Article
          </Link>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onDelete}
          >
            <i className="ion-trash-a"></i>
            Delete article
          </button>
        </span>
      )}
    </div>
  );
};

export default ArticleMeta;
