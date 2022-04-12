import React from 'react';
import PropTypes from 'prop-types';

const DetailsImage = ({ width, height, src, className, alt }) => (
  <img
    width={width}
    height={height}
    src={src}
    className={className}
    alt={alt}
  />
);

DetailsImage.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default DetailsImage;
