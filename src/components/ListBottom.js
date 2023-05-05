import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

const ListBtn = styled.button`
    border: none;
    background: none;
    text-decoration: underline;
    font-family: 'Courier New', Courier, monospace;
    font-size: 2em;
    font-weight: 700;
    cursor: pointer;
`

export const ListBottom = () => {
  const [moviesLow, setMoviesLow] = useState([])
  const [loading, setLoading] = useState(false)
  const [showMovies, setShowMovies] = useState(false);

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
      <h2>11-250</h2>
      <ListBtn
        type="button"
        className="btn"
        onClick={() => handleClick()}>
        {showMovies === true ? 'Hide Movies' : 'Show Movies'}
      </ListBtn>
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