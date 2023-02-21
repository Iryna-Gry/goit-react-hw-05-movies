import React from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/fetchAPI';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const movie = getMovieDetails(movieId);

  return <div>MovieDetails{movie}</div>;
};
