import { useState, useEffect } from 'react';
import { MovieGallery, Searchbar, Loader, NotFound } from 'components';
import { getMoviesSearch } from 'services/fetchAPI';
import { useLocation, useSearchParams } from 'react-router-dom';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams('');
  const location = useLocation();

  useEffect(() => {
    if (searchParams.get('filter') === '' || undefined) {
      return;
    }
    setStatus('pending');

    getMoviesSearch(searchParams.get('filter'))
      .then(response => {
        setMovies([...response.results]);
        setStatus('completed');
      })
      .catch(error => setError(error));
  }, [searchParams]);

  const handleSearchSubmit = keyword => {
    if (keyword === '') {
      alert('Searchfield is empty. Please, specify your search request.');
      return;
    } else {
      setSearchParams(keyword !== '' ? { filter: keyword } : {});
    }
  };

  return (
    <main>
      <Searchbar
        onFormSubmit={handleSearchSubmit}
        value={searchParams.get('filter') ?? ''}
      />
      ;
      <div>
        {status === 'pending' ? <Loader></Loader> : null}
        {movies.length > 0 && searchParams.get('filter') ? (
          <MovieGallery data={movies} state={{ from: location }}></MovieGallery>
        ) : error ? (
          <p>Something went wrong. Please, refresh the page</p>
        ) : (
          <NotFound />
        )}
      </div>
    </main>
  );
};
