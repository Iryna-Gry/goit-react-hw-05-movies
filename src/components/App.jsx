import { Container, Header, HeaderLink } from 'components';
import { Home, Cast, Reviews, Movies, MovieDetails } from 'pages';
import { Routes, Route } from 'react-router-dom';
import css from 'components/App.module.css';

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
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
    </div>
  );
};
