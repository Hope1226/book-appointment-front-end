import React from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';

const NoDataMessage = ({ text }) => (
  <>
    <Empty description={text} imageStyle={{ height: 120 }} />
  </>
);

NoDataMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default NoDataMessage;
