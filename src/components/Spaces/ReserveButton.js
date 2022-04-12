import React from 'react';
import PropTypes from 'prop-types';

const ReserveButton = ({ btnText }) => <span>{btnText}</span>;

ReserveButton.propTypes = {
  btnText: PropTypes.string.isRequired,
};

export default ReserveButton;
