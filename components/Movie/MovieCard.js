import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import Modal from '../Modal';

const MovieCard = ({ movie }) => {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, login } = useContext(AuthContext);

  const handleProtectedRoute = (path) => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      if (path === 'favorites') {
        toggleFavorite();
      } else if (path === 'watchlist') {
        toggleWatchlist();
      }
    }
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    login();
  };

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    setIsFavorite(favorites.some((favMovie) => favMovie.id === movie.id));
    setIsWatchlist(watchlist.some((watchMovie) => watchMovie.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      favorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
    } else {
      favorites.push(movie);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = () => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (isWatchlist) {
      watchlist = watchlist.filter((watchMovie) => watchMovie.id !== movie.id);
    } else {
      watchlist.push(movie);
    }

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsWatchlist(!isWatchlist);
  };

  return (
    <>
      <Link to={`/movie/${movie.id}`} className='block'>
        <div className='relative group flex-shrink-0 w-36 md:w-48'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={`w-full h-auto rounded-md ${loading ? 'hidden' : 'block'}`}
            onLoad={() => setLoading(false)}
          />
          {location.pathname !== '/favorites' && location.pathname !== '/watchlist' && !loading && (
            <div className='absolute inset-0 flex justify-end items-end bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-opacity duration-300'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleProtectedRoute('watchlist');
                }}
                className='bg-transparent text-white font-bold py-1 m-2'
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  color={isWatchlist && user ? '#3B82F6' : 'white'}
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleProtectedRoute('favorites');
                }}
                className='bg-transparent text-white font-bold py-1 m-2'
              >
                <FontAwesomeIcon icon={faHeart} color={isFavorite && user ? 'red' : 'white'} />
              </button>
            </div>
          )}
        </div>
      </Link>
      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h2 className='text-xl text-black mb-4'>Login Required</h2>
        <p className='text-black mb-4'>Please log in to do this action.</p>
        <button
          onClick={handleLogin}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
        >
          Login with TMDB
        </button>
      </Modal>
    </>
  );
};

export default MovieCard;
