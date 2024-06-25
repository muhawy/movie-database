import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchRecommendations } from '../../services/tmdbApi';
import MovieCard from './MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { formatDateString } from '../Helpers/function';
import Modal from '../Modal';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
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
    const loadMovie = async () => {
      try {
        setLoading(true);
        const movieDetails = await fetchMovieDetails(id);
        setMovie(movieDetails);
        const recommendations = await fetchRecommendations(id);
        setRecommendations(recommendations);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        setIsFavorite(favorites.some((favMovie) => favMovie.id === movieDetails.id));
        setIsWatchlist(watchlist.some((watchMovie) => watchMovie.id === movieDetails.id));
      } catch (error) {
        console.error('Error loading movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

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

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='loader'></div>
      </div>
    );
  }

  if (!movie) return <div>Error loading movie details</div>;

  return (
    <>
      <div
        className='relative bg-cover bg-center w-full mb-4 md:h-96'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>

        <div className='relative container mx-auto py-4 px-4 md:px-32'>
          <div className='flex flex-col md:flex-row gap-4'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className='rounded-md w-full md:w-56'
            />
            <div className='py-4 md:py-8'>
              <h1 className='text-2xl md:text-3xl font-bold mb-2 md:mb-4'>
                {movie.title} <span>({movie.release_date.slice(0, 4)})</span>
              </h1>
              <p className='text-sm md:text-base'>
                {formatDateString(movie.release_date)} &#8226;{' '}
                {movie.genres.map((val, i) => (i !== 0 ? ', ' : '') + val.name).join('')} &#8226;{' '}
                {movie.runtime}
              </p>
              <div className='flex items-center gap-2 md:gap-4 my-2 md:my-4'>
                <p className='self-center text-sm md:text-base'>
                  <FontAwesomeIcon icon={faStar} color={'yellow'} />
                  <span className='ml-1'>{String(movie.vote_average).slice(0, 4)}</span>
                </p>
                <button
                  onClick={() => handleProtectedRoute('favorites')}
                  className='bg-transparent font-bold'
                >
                  <FontAwesomeIcon icon={faHeart} color={isFavorite && user ? 'red' : 'white'} />
                </button>
                <button
                  onClick={() => handleProtectedRoute('watchlist')}
                  className='bg-transparent font-bold'
                >
                  <FontAwesomeIcon
                    icon={faBookmark}
                    color={isWatchlist && user ? '#3B82F6' : 'white'}
                  />
                </button>
              </div>
              <div>
                <p className='mb-2 italic text-sm md:text-base'>{movie.tagline}</p>
                <h1 className='text-lg md:text-xl font-bold'>Overview</h1>
                <p className='text-sm md:text-base'>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 md:px-32'>
        <h2 className='text-xl md:text-2xl font-bold mt-8 mb-4'>Recommendations</h2>
        <div className='flex space-x-2 md:space-x-4 overflow-x-auto'>
          {recommendations.map((recMovie) => (
            <MovieCard key={recMovie.id} movie={recMovie} />
          ))}
        </div>
      </div>

      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <div className='flex flex-col justify-center'>
          <h2 className='text-xl md:text-2xl text-black mb-4'>Login Required</h2>
          <p className='text-black mb-4'>Please log in to do this action.</p>
          <button
            onClick={handleLogin}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
          >
            Login with TMDB
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MovieDetails;
