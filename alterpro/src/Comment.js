import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ comment, onReply, onReact }) => {
  return (
    <div>
      <img src={comment.user.photoURL} alt="Profile" />
      <span>{comment.user.name}</span>
      <p dangerouslySetInnerHTML={{ __html: comment.text }} />
      {comment.image && <img src={URL.createObjectURL(comment.image)} alt="Attached" />}
      <div>
        <button onClick={() => onReact(comment.id, 'like')}>👍 {comment.reactions.like}</button>
        <button onClick={() => onReact(comment.id, 'dislike')}>👎 {comment.reactions.dislike}</button>
        <button onClick={() => onReply(comment.id)}>Reply</button>
      </div>
      <p>{formatDistanceToNow(new Date(comment.timestamp))} ago</p>
    </div>
  );
};

export default Comment;
