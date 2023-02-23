import { useState, useEffect } from 'react';
import { MovieGallery, Searchbar, Loader, NotFound } from 'components';
import { getMoviesSearch } from 'services/fetchAPI';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams('');
  const query = searchParams.get('filter') ?? '';
  useEffect(() => {
    if (query === '' || undefined || null) {
      return;
    }
    setIsLoading(true);

    getMoviesSearch(query)
      .then(response => {
        if (response.results.length === 0) {
          return <NotFound />;
        }
        setMovies([...response.results]);
        setIsLoading(false);
      })
      .catch(error => setError(error));
  }, [query]);

  const handleSearchSubmit = keyword => {
    if (keyword === '') {
      alert('Searchfield is empty. Please, specify your search request.');
      return;
    } else {
      setSearchParams({ filter: keyword });
    }
  };

  return (
    <main>
      <Searchbar onFormSubmit={handleSearchSubmit} />
      <div>
        {isLoading && <Loader></Loader>}
        {movies.length > 0 ? <MovieGallery data={movies}></MovieGallery> : null}
        {error && <p>Something went wrong. Please, refresh the page</p>}
      </div>
    </main>
  );
};
export default Movies;
