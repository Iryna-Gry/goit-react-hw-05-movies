import { useState, useEffect } from 'react';
import { fetchAPI } from 'services/fetchAPI';

import { MovieGallery, Loader } from 'components';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus('pending');
    const page = 1;
    fetchAPI(page)
      .then(response => {
        setMovies([...response.results]);
        setStatus('completed');
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <div>
      {status === 'pending' ? <Loader></Loader> : null}
      {movies.length > 0 ? (
        <MovieGallery data={movies}></MovieGallery>
      ) : (
        error && <p>Something went wrong. Please, refresh the page</p>
      )}
    </div>
  );
};
