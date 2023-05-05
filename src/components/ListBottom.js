/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';

export const ListBottom = () => {
  const [moviesLow, setMoviesLow] = useState([])
  const [loading, setLoading] = useState(false)
  const [showMovies, setShowMovies] = useState(false);
  //   const [movieStates, setMovieStates] = useState(
  //     moviesLow.map(() => false)
  //   )

  useEffect(() => {
    setLoading(true);
    fetch('https://project-express-api-ru2v7b5sba-lz.a.run.app/movies/')
      .then((res) => res.json())
      .then((data) => {
        setMoviesLow(data.slice(10, 250))
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleClick = () => {
    setShowMovies(!showMovies)
  }
  return (
    <div>
      <button
        type="button"
        className="btn"
        onClick={() => handleClick()}>
        {showMovies === true ? 'Hide Movies' : 'Show Movies'}
      </button>
      {showMovies === true && (
        <ul>
          {moviesLow.map((movieLow) => (
            <li key={movieLow.id}>{movieLow.rank} {movieLow.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}