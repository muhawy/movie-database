import React, { useState, useEffect } from 'react';
import { fetchNowPlaying, fetchTopRated } from '../services/tmdbApi';
import MovieCard from '../components/Movie/MovieCard';

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const nowPlayingMovies = await fetchNowPlaying();
        const topRatedMovies = await fetchTopRated();
        setNowPlaying(nowPlayingMovies);
        setTopRated(topRatedMovies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className='container mx-auto px-4 md:px-32 py-4'>
        <h2 className='text-white text-2xl font-bold mb-4'>Now Playing</h2>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='loader'></div>
          </div>
        ) : (
          <div className='flex space-x-4 overflow-x-auto'>
            {nowPlaying.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
        <h2 className='text-white text-2xl font-bold mb-4 mt-8'>Top Rated</h2>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='loader'></div>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 justify-items-center'>
            {topRated.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
