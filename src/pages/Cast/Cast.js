import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCast } from 'services/fetchAPI';
import { CastGallery, NotFound } from 'components';
import css from 'pages/MovieDetails/MovieDetails.module.css';

export const Cast = () => {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getCast(movieId).then(response => {
      setCast([...response.cast]);
    });
  }, [movieId]);
  return (
    <div className={css.Movie__additional}>
      <h2 className={css.Movie__chapterTitle} style={{ marginTop: '0' }}>
        Cast
      </h2>
      {cast && cast[0] ? <CastGallery data={cast} /> : <NotFound />}
    </div>
  );
};
