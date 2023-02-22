import { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'components/ReviewGallery/ReviewGallery.module.css';

export const ReviewGallery = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <ul className={css.Review_Container}>
      {data.map(item => {
        return (
          <li key={item.id}>
            <p className={css.Review_name}>{item.author}</p>
            <p className={css.Review_text}>
              {showMore ? item.content : item.content.substring(0, 250)}
              <button
                className={css.showMore_Btn}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'show less' : 'show more'}
              </button>
            </p>
          </li>
        );
      })}
    </ul>
  );
};

ReviewGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
