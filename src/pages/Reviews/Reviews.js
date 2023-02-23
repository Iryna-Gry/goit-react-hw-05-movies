import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'services/fetchAPI';
import { ReviewGallery, NotFound } from 'components';
import css from 'pages/MovieDetails/MovieDetails.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getReviews(movieId)
      .then(response => {
        setReviews([...response.results]);
      })
      .catch(error => setError(error));
  }, [movieId]);
  return (
    <div className={css.Movie__additional}>
      <h2 className={css.Movie__chapterTitle} style={{ marginTop: '0px' }}>
        Reviews
      </h2>
      {reviews && reviews[0] ? (
        <ReviewGallery data={reviews} />
      ) : error ? (
        <p>Something went wrong. Please, refresh the page</p>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Reviews;
