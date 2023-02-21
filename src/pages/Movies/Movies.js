import { useState, useEffect } from 'react';
import { MovieGallery, Searchbar, Loader } from 'components';
import { getMoviesSearch } from 'services/fetchAPI';

export const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');

    getMoviesSearch(query).then(response => {
      setMovies([...response.results]);
      setStatus('completed');
    });
  }, [query]);

  const handleSearchSubmit = keyword => {
    if (keyword === '') {
      alert('Searchfield is empty. Please, specify your search request.');
      return;
    } else {
      setQuery(keyword);
    }
  };
  return (
    <main>
      <Searchbar onFormSubmit={handleSearchSubmit} />;
      <div>
        {status === 'pending' ? <Loader></Loader> : null}
        {movies.length > 0 ? <MovieGallery data={movies}></MovieGallery> : null}
      </div>
    </main>
  );
};
