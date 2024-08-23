import React, { useState } from 'react';
import Comment from './Comment';

const CommentList = ({ comments, onReply, onReact }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} onReply={onReply} onReact={onReact} />
          {comment.text.length > 5 && (
            <button onClick={() => toggleExpand(comment.id)}>
              {expanded[comment.id] ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
