import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

export const MoviesList = () => {
  const [movies, setMovies] = useState(['']);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    fetch('https://project-express-api-ru2v7b5sba-lz.a.run.app/movies/')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  console.log(movies)
  if (loading) {
    return <Loader />;
  }
  return (
    <section>
      {movies.map((movie) => (
        <div key={movie}>
          <h3>{movie.rank}</h3>
          <a href={movie.link}> {movie.title} </a>
        </div>
      ))}
    </section>
  );
}