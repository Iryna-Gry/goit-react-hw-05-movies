import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCast } from 'services/fetchAPI';
import { CastGallery, Loader, NotFound } from 'components';
import css from 'pages/MovieDetails/MovieDetails.module.css';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getCast(movieId)
      .then(response => {
        setCast([...response.cast]);
      })
      .catch(error => setError(error));
    setIsLoading(false);
  }, [movieId, isLoading]);
  return (
    <>
      {isLoading && <Loader />}

      {cast.length > 0 && (
        <div className={css.Movie__additional}>
          <h2 className={css.Movie__chapterTitle} style={{ marginTop: '0' }}>
            Cast
          </h2>
          <CastGallery data={cast} />
        </div>
      )}
      {cast.length === 0 && <NotFound />}
      {error && <p>Something went wrong. Please, refresh the page</p>}
    </>
  );
};
export default Cast;
