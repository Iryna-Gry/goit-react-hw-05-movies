import { Container, Header, HeaderLink, NotFound } from 'components';
import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { Home, Movies, MovieDetails } from 'pages';
import css from 'components/App.module.css';

const Cast = lazy(() => import('../pages/Cast/Cast'));
const Reviews = lazy(() => import('../pages/Reviews/Reviews'));

export const App = () => {
  return (
    <div className={css.App}>
      <Container>
        <Header>
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/movies">Movies</HeaderLink>
        </Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
    </div>
  );
};
