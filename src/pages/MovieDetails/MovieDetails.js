import { useState, useEffect, Suspense } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/fetchAPI';
import css from 'pages/MovieDetails/MovieDetails.module.css';
import { Loader } from 'components';
import { MovieCard } from 'components/MovieCard/MovieCard';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const fromLocation = location.state?.from ?? '/';
  useEffect(() => {
    getMovieDetails(movieId)
      .then(response => {
        setMovie({ ...response });
      })
      .catch(error => setError(error));
  }, [movieId]);

  return (
    <>
      {movie && (
        <div style={{ textAlign: 'left' }}>
          <Link to={fromLocation} className={css.Movie_link}>
            <BsFillArrowLeftCircleFill className={css.Movie_link_icon} />
            <span>Go back</span>
          </Link>
          <MovieCard movie={movie} />
          <div className={css.Movie__additional}>
            <h2 className={css.Movie__chapterTitle}>Additional information</h2>
            <ul className={css.Link__list}>
              <li>
                <Link
                  to="cast"
                  state={{ from: fromLocation }}
                  className={css.Movie_link}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to="reviews"
                  state={{ from: fromLocation }}
                  className={css.Movie_link}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {error && <p>Something went wrong. Please, refresh the page</p>}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};
export default MovieDetails;
