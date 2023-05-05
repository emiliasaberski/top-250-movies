import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';
// eslint-disable-next-line import/no-cycle
import { ListBottom } from './ListBottom';
import { Footer } from './Footer';

const PageContainer = styled.div`
display: flex;
flex-direction: column;
  align-items: center;;
  justify-content: center;
  width: 100vw;
  margin: 20px;
`
const Container = styled.div` 
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 20px;

  @media (min-width: 668px){
    grid-template-columns: repeat(5, 20%);
    width: 100vw;
  }
`

const BodyWrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: lightpink;
  max-width: 50vw;
  height: 200px;
  text-decoration: none;
  color: black;
  overflow: hidden;

  &:hover {
    background-color: black;
    color: lightpink;
  }
`

const Rank = styled.h2`
  font-family: 'Courier New', Courier, monospace;
  font-size: 2em;
  padding-top: 20px;
`

const Text = styled.p`
  font-family: 'Courier New', Courier, monospace;
  font-size: 1em;
  font-weight: 300;
  padding: 10px;
  overflow-y: scroll;
  &::-webkit-scrollbar{
  display: none;
}
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    fetch('https://project-express-api-ru2v7b5sba-lz.a.run.app/movies/')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.slice(0, 10));
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
  // const toggleClassCheck = show ? ' active' : '';

  return (
    <PageContainer>
      <a href="https://project-express-api-ru2v7b5sba-lz.a.run.app/">API</a>
      <Rank>IMDB Top 10</Rank>
      <Container>
        {movies.map((movie) => (
          <BodyWrapper href={movie.link} key={movie}>
            <Rank>{movie.rank}</Rank>
            <Text> {movie.title} <br />
              {movie.year}
            </Text>
          </BodyWrapper>
        ))}
      </Container>
      <Bottom>
        <Rank>11-250</Rank>
        <ListBottom />
      </Bottom>
      <Footer />
    </PageContainer>
  );
}