import { useState, useEffect, Suspense } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/fetchAPI';
import css from 'pages/MovieDetails/MovieDetails.module.css';
import myImageUrl from 'images/sorry.png';
import { Loader } from 'components';

export const MovieDetails = () => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500/';
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    getMovieDetails(movieId)
      .then(response => {
        setMovie({ ...response });
      })
      .catch(error => setError(error));
  }, [movieId]);

  return movie ? (
    <>
      <div style={{ textAlign: 'left' }}>
        <Link to={location.state?.from ?? '/'} className={css.Movie_link}>
          <BsFillArrowLeftCircleFill className={css.Movie_link_icon} />
          <span>Go back</span>
        </Link>
        <div className={css.MovieDetails__container}>
          <div>
            <div className={css.Image__container}>
              <img
                src={
                  movie.poster_path ? BASE_URL + movie.poster_path : myImageUrl
                }
                className={css.Movie__img}
                alt={movie.original_title}
              />
            </div>
            <div className={css.MovieInfo_container}>
              <h1 className={css.Movie_title}>
                {movie.original_title}
                <span>({parseInt(movie.release_date)})</span>
              </h1>
              <p className={css.Movie__subtitle}>
                User Score: {Math.round(movie.vote_average * 10)}%
              </p>

              <h2 className={css.Movie__chapterTitle}>Overview</h2>
              <p className={css.Movie__chapterText}>{movie.overview}</p>

              <h2 className={css.Movie__chapterTitle}>Genres</h2>
              <p
                className={css.Movie__chapterText}
                style={{ color: 'crimson', fontWeight: '700' }}
              >
                {movie.genres.map(item => item.name).join(' | ')}
              </p>
            </div>
          </div>
        </div>
        <div className={css.Movie__additional}>
          <h2 className={css.Movie__chapterTitle}>Additional information</h2>
          <ul className={css.Link__list}>
            <li>
              <Link to="cast" className={css.Movie_link}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" className={css.Movie_link}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  ) : error ? (
    <p>Something went wrong. Please, refresh the page</p>
  ) : (
    <Loader />
  );
};