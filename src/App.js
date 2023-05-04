import { MoviesList } from 'components/Movies'
import { MoviesDetails } from 'components/MoviesDetails';
import NotFound from 'components/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:movieId" element={<MoviesDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}