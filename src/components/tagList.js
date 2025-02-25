import React from 'react';

const TagList = ({tags}) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => (
        <li className="tag-default tag-pill tag-outline" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagList;
