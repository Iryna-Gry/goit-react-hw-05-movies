import React from 'react';
import PropTypes from 'prop-types';
import css from 'components/CastGallery/CastGallery.module.css';
import myImageUrl from 'images/sorry.png';

export const CastGallery = ({ data }) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w200';
  const noPosterImg = myImageUrl;
  return (
    <ul className={css.Cast_Container}>
      {data.map(item => {
        return (
          <li key={item.id} className={css.Img_Container}>
            <img
              src={
                item.profile_path ? BASE_URL + item.profile_path : noPosterImg
              }
              alt={item.original_name}
            />
            <p className={css.Character_name}>{item.character}</p>
            <p className={css.Actor_name}>{item.original_name}</p>
          </li>
        );
      })}
    </ul>
  );
};

CastGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      profile_path: PropTypes.string,
      character: PropTypes.string.isRequired,
      original_name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
