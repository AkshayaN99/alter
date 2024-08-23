import React from 'react';

const CommentSorter = ({ onSortChange }) => {
  return (
    <div>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="popularity">Most Popular</option>
      </select>
    </div>
  );
};

export default CommentSorter;
