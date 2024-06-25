import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetails from './components/Movie/MovieDetails';
import Watchlist from './pages/Watchlist';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className='min-h-screen'>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/movie/:id' element={<MovieDetails />} />
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/search' element={<SearchResults />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
