import { useState, useEffect } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Link, Outlet, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/fetchAPI';
import css from 'pages/MovieDetails/MovieDetails.module.css';
import { Container } from 'components';

export const MovieDetails = () => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500/';
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(movieId).then(response => {
      setMovie({ ...response });
    });
  }, [movieId]);

  return movie ? (
    <div style={{ textAlign: 'left' }}>
      <Link to="/movies" className={css.Movie_link}>
        <BsFillArrowLeftCircleFill className={css.Movie_link_icon} />
        <span>Go back</span>
      </Link>
      <div className={css.MovieDetails__container}>
        <div>
          <div className={css.Image__container}>
            <img
              src={BASE_URL + movie.poster_path}
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
      <Outlet />
    </div>
  ) : null;
};
