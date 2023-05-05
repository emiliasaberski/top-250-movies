import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-cycle
import { Loader } from './Loader';

const PageWrapper = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ListBtn = styled.button`
    border: none;
    background: none;
    text-decoration: underline;
    font-family: 'Courier New', Courier, monospace;
    font-size: 2em;
    font-weight: 700;
    cursor: pointer;
`
const List = styled.ul`
  list-style-type: none;
  line-height: 1.5em;
`

const ListItem = styled.li`
    font-family: 'Courier New', Courier, monospace;
  font-size: 1em;
  font-weight: 300;
  align-items: center;
  justify-items: center;
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
    <PageWrapper>
      <ListBtn
        type="button"
        className="btn"
        onClick={() => handleClick()}>
        {showMovies === true ? 'Hide Movies' : 'Show Movies'}
      </ListBtn>
      {showMovies === true && (
        <List>
          {moviesLow.map((movieLow) => (
            <ListItem key={movieLow.id}>{movieLow.rank} {movieLow.title}</ListItem>
          ))}
        </List>
      )}
    </PageWrapper>
  )
}