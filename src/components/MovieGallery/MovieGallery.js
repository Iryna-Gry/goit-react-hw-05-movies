import React from 'react';
import css from 'components/MovieGallery/MovieGallery.module.css';
import { MovieGalleryItem } from 'components';
import PropTypes from 'prop-types';

export const MovieGallery = ({ data }) => {
  return (
    <ul className={css.MovieGallery}>
      {data.map(image => {
        return (
          <MovieGalleryItem
            src={image.poster_path}
            key={image.id}
            id={image.id}
            alt={image.original_title}
            smallImageURL={image.poster_path}
            largeImageURL={image.backdrop_path}
          ></MovieGalleryItem>
        );
      })}
    </ul>
  );
};

MovieGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string,
      backdrop_path: PropTypes.string,
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
    })
  ),
};
