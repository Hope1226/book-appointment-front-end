import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import './buttonDesign.css';
import PropTypes from 'prop-types';
import ReserveButton from './ReserveButton';

const SpaceCard = ({ id, name, image, description, price }) => (
  <Card
    hoverable
    className="space-card"
    cover={<img alt="Space" src={image} />}
    actions={[
      <Link key="link" to={`/spaces/${id}`}>
        <button type="button" className="custom-btn btn-12">
          <span>${price}</span>
          <ReserveButton btnText="Reserve Now" />
        </button>
      </Link>,
    ]}
  >
    <Card.Meta title={name} description={description} />
  </Card>
);

SpaceCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default SpaceCard;
