import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

const Container = styled.div` 
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 100vw;
  margin: 20px;
`

const BodyWrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: lightpink;
  width: 200px;
  height: 200px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: black;
    color: lightpink;
  }
`

const Rank = styled.h1`
  font-family: 'Courier New', Courier, monospace;
  font-size: 2em;
  padding-top: 20px;
`

const Text = styled.p`
  font-family: 'Courier New', Courier, monospace;
  font-size: 1em;
  font-weight: 300;
  padding: 10px;
`

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLow, setMoviesLow] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    fetch('https://project-express-api-ru2v7b5sba-lz.a.run.app/movies/')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.slice(0, 10));
        setMoviesLow(data.slice(10, 250))
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
    <>
      <Rank>Top 10</Rank>
      <Container>
        {movies.map((movie) => (
          <BodyWrapper href={movie.link} key={movie}>
            <Rank>{movie.rank}</Rank>
            <Text> {movie.title} </Text>
          </BodyWrapper>
        ))}
        <div>
          {moviesLow.map((movieLow) => (
            <>
              <p>{movieLow.rank}</p>
              <p>{movieLow.title}</p>
            </>
          ))}
        </div>
      </Container>
    </>
  );
}