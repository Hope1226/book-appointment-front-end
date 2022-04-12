import React from 'react';
import { CaretLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const BackButton = () => (
  <Link key="link" to="/">
    <CaretLeftOutlined style={{ color: '#fff' }} className="back-icon" />
  </Link>
);

export default BackButton;
