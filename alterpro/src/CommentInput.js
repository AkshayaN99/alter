import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CommentInput = ({ onSubmit }) => {
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const charLimit = 250;

  const handleCommentChange = (value) => {
    if (value.length <= charLimit) {
      setComment(value);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit({ comment, image });
    setComment('');
    setImage(null);
  };

  return (
    <div>
      <ReactQuill value={comment} onChange={handleCommentChange} />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{charLimit - comment.length} characters left</p>
    </div>
  );
};

export default CommentInput;
