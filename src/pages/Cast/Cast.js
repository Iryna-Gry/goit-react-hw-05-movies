import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCast } from 'services/fetchAPI';
import { CastGallery } from 'components';

export const Cast = () => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500/';
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getCast(movieId).then(response => {
      setCast([...response.cast]);
    });
  }, [movieId]);
  return (
    <div>
      <h2>Cast</h2>
      {cast ? <CastGallery data={cast} /> : null}
    </div>
  );
};
