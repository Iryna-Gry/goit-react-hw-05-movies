import { Container, Header, HeaderLink } from 'components';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader } from 'components';
import css from 'components/App.module.css';
const Home = lazy(() => import('../pages/Home/Home'));
const Cast = lazy(() => import('../pages/Cast/Cast'));
const Reviews = lazy(() => import('../pages/Reviews/Reviews'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));

export const App = () => {
  return (
    <div className={css.App}>
      <Container>
        <Header>
          <HeaderLink to="/">Home</HeaderLink>
          <HeaderLink to="/movies">Movies</HeaderLink>
        </Header>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>

            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
};
