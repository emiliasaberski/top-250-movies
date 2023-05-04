import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

export const MoviesDetails = () => {
  const [movie, setMovie] = useState(['']);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    fetch('https://project-express-api-ru2v7b5sba-lz.a.run.app/movies/')
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  console.log(movie)
  if (loading) {
    return <Loader />;
  }
  return (
    <section>
      <p>Hej</p>
    </section>
  )
}
