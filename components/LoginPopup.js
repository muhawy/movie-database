import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginPopup = ({ closePopup }) => {
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    await login();
    closePopup();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded shadow-md text-center'>
        <h2 className='text-2xl mb-4'>Login Required</h2>
        <p className='mb-4'>You need to log in to access this feature.</p>
        <button onClick={handleLogin} className='bg-blue-500 text-white py-2 px-4 rounded'>
          Login
        </button>
        <button onClick={closePopup} className='mt-4 text-gray-500'>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
