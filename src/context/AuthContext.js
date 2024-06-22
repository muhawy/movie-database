import React, { createContext, useState, useEffect } from 'react';
import { createRequestToken, createSession, fetchAccountDetails } from '../services/tmdbApi';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  console.log(sessionId);

  const login = async () => {
    try {
      const token = await createRequestToken();
      localStorage.setItem('requestToken', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}`;
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const completeLogin = async (requestToken) => {
    try {
      const sessionId = await createSession(requestToken);
      const userDetails = await fetchAccountDetails(sessionId);
      setUser(userDetails);
      setSessionId(sessionId);
      localStorage.setItem('sessionId', sessionId);
      localStorage.removeItem('requestToken');
    } catch (error) {
      console.error('Error during session creation:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setSessionId(null);
    localStorage.removeItem('sessionId');
    // localStorage.removeItem('favorites');
    // localStorage.removeItem('watchlist');
  };

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      fetchAccountDetails(storedSessionId)
        .then((response) => {
          setUser(response);
          setSessionId(storedSessionId);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          logout();
        });
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const requestToken = urlParams.get('request_token');
      if (requestToken) {
        completeLogin(requestToken);
      }
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
