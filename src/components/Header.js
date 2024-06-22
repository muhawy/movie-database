import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const Header = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  const handleProtectedRoute = (path) => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    login();
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  return (
    <header className='bg-gray-900 text-white py-4'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-32'>
        <div className='flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-4 md:mb-0'>
          <Link to='/' className='text-2xl font-bold'>
            C I N E M A
          </Link>
          <form onSubmit={handleSearch} className='flex items-center space-x-2'>
            <input
              type='text'
              className='py-1.5 px-4 text-black rounded-lg'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search movies...'
            />
            <button type='submit' className='py-1.5 px-4 bg-blue-500 rounded-lg'>
              Search
            </button>
          </form>
        </div>
        <nav className='flex items-center gap-4'>
          <button onClick={() => handleProtectedRoute('/watchlist')} className='mr-4'>
            Watchlist
          </button>
          <button onClick={() => handleProtectedRoute('/favorites')} className='mr-4'>
            Favorites
          </button>
          {user && (
            <button onClick={() => setShowLogoutModal(true)}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} color='white' className='mt-2' />
            </button>
          )}
        </nav>
      </div>
      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h2 className='text-xl text-black mb-4'>Login Required</h2>
        <p className='text-black mb-4'>Please log in to access this page.</p>
        <button
          onClick={handleLogin}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
        >
          Login with TMDB
        </button>
      </Modal>
      <Modal show={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <h2 className='text-xl text-black mb-4'>Logout</h2>
        <p className='text-black mb-4'>Are you sure want to logout?</p>
        <button
          onClick={handleLogout}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
        >
          Yes
        </button>
      </Modal>
    </header>
  );
};

export default Header;
