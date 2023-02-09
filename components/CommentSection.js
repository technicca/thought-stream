import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useContext } from 'react';
import { UserContext } from '@lib/context';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });

    return () => unsubscribe();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!firebase.auth().currentUser) {
      return;
    }

    if (newComment.length < 5) {
      setErrorMessage('Comments must be at least 5 characters long.');
      return;
    }

    const user = firebase.auth().currentUser;
    const commentRef = firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments');

    await commentRef.add({
      text: newComment,
      author: {
        uid: user.uid,
        displayName: user.displayName,
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setNewComment('');
  };
  const { user, username } = useContext(UserContext);

  return (
    <div className='card2'>
      <h2>Comments</h2>
      {errorMessage && <p className='error'>{errorMessage}</p>}
      <ul>
      {comments
  .sort((a, b) => b.createdAt - a.createdAt)
  .map((comment, index) => (
    <li key={index}>
      <strong>{comment.author.displayName || 'Anonymous User'}: </strong>{' '}
      <em>{comment.text}</em>
    </li>
  ))}

      </ul>
     
        {username && (
           <form onSubmit={handleSubmit}>
           <textarea
             className='textarea'
             value={newComment}
             onChange={(event) => setNewComment(event.target.value)}
           />
           <button type='submit' className='btn-google'>
             Post comment
           </button>
           </form>
        )}
      {!username && (
        'Sign in to comment'
      )}
    </div>
  );
};

export default CommentSection;
