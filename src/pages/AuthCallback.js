import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { completeLogin } = useContext(AuthContext);

  useEffect(() => {
    const requestToken = new URLSearchParams(location.search).get('request_token');
    if (requestToken) {
      completeLogin(requestToken).then(() => {
        navigate('/');
      });
    }
  }, [location, completeLogin, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
