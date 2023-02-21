import React from 'react';
import css from 'components/Button/Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onButtonClick }) => {
  return (
    <button type="submit" className={css.Button} onClick={onButtonClick}>
      Load More
    </button>
  );
};

Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};
