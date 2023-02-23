import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'services/fetchAPI';
import { ReviewGallery, NotFound, Loader } from 'components';
import css from 'pages/MovieDetails/MovieDetails.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReviews(movieId)
      .then(response => {
        setReviews([...response.results]);
      })
      .catch(error => setError(error));
    setIsLoading(false);
  }, [movieId, isLoading]);
  return (
    <>
      {isLoading && <Loader />}
      {reviews.length > 0 && (
        <div className={css.Movie__additional}>
          <h2 className={css.Movie__chapterTitle} style={{ marginTop: '0px' }}>
            Reviews
          </h2>
          <ReviewGallery data={reviews} />
        </div>
      )}

      {error && <p>Something went wrong. Please, refresh the page</p>}
      {reviews.length === 0 && !isLoading && <NotFound />}
    </>
  );
};

export default Reviews;
