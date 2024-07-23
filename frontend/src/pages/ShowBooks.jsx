import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBooks = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log(response.data); // Log the response data to check its structure
        setBook(response.data.book); // Ensure you are setting the correct data structure
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the book:', error);
        setLoading(false);
      });
  }, [id]); // Add `id` to the dependency array

  if (loading) {
    return <Spinner />;
  }

  if (!book) {
    return (
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Show Book</h1>
        <p>Book not found.</p>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title</span>
          <span>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Author</span>
          <span>{book.author}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
          <span>{book.publishYear}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Create Time</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowBooks;
