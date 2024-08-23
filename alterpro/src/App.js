import React, { useState, useEffect } from 'react';
import GoogleAuth from './GoogleAuth';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import CommentSorter from './CommentSorter';
import Pagination from './Pagination';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 8;

  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy(sortOrder === 'latest' ? 'timestamp' : 'popularity', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(data);
    });

    return () => unsubscribe();
  }, [sortOrder]);

  const handleSubmit = async ({ comment, image }) => {
    if (user) {
      try {
        await addDoc(collection(db, 'comments'), {
          user: { name: user.displayName, photoURL: user.photoURL },
          text: comment,
          image,
          timestamp: Date.now(),
          reactions: { like: 0, dislike: 0 },
        });
        toast.success('Comment added successfully!');
      } catch (error) {
        toast.error('Failed to add comment');
      }
    } else {
      toast.error('You must be logged in to comment');
    }
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReact = (commentId, reactionType) => {
    // Handle reactions here
  };

  const handleReply = (commentId) => {
    // Handle replies here
  };

  const currentComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  return (
    <div>
      <GoogleAuth />
      {user && <CommentInput onSubmit={handleSubmit} />}
      <CommentSorter onSortChange={handleSortChange} />
      <CommentList comments={currentComments} onReply={handleReply} onReact={handleReact} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(comments.length / commentsPerPage)}
        onPageChange={handlePageChange}
      />
      <ToastContainer />
    </div>
  );
};

export default App;
