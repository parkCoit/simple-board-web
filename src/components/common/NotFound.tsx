import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-7xl m-0">404</h1>
        <p className="text-2xl my-8 mx-0">This is not the web page you are looking for.</p>
        <Link to="/" className="text-lg text-sky-400 ">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;