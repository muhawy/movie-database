import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../services/tmdbApi';
import MovieCard from '../components/Movie/MovieCard';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get('q');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        const searchResults = await searchMovies(query);
        setResults(searchResults);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Search Results for "{query}"</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
