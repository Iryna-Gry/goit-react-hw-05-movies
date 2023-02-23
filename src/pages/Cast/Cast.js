import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCast } from 'services/fetchAPI';
import { CastGallery, NotFound } from 'components';
import css from 'pages/MovieDetails/MovieDetails.module.css';

const Cast = () => {
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getCast(movieId)
      .then(response => {
        setCast([...response.cast]);
      })
      .catch(error => setError(error));
  }, [movieId]);
  return (
    <div className={css.Movie__additional}>
      <h2 className={css.Movie__chapterTitle} style={{ marginTop: '0' }}>
        Cast
      </h2>
      {cast && cast[0] ? (
        <CastGallery data={cast} />
      ) : error ? (
        <p>Something went wrong. Please, refresh the page</p>
      ) : (
        <NotFound />
      )}
    </div>
  );
};
export default Cast;
