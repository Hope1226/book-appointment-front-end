import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { message } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import SpinLoading from '../Spinner';
import DetailsImage from './DetailsImage';
import BackButton from './BackButton';

const Details = () => {
  const { id } = useParams();
  const [space, setSpace] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const getSpace = async () => {
    try {
      setIsLoading(true);
      const { token } = JSON.parse(localStorage.getItem('userInformation'));
      const response = await fetch(
        `https://api-spaces.herokuapp.com/spaces/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      const data = await response.json();
      setSpace(data);
      setIsLoading(false);
    } catch (err) {
      message.error('Error fetching data, try again!');
    }
  };

  useEffect(() => {
    getSpace();
  }, []);
  return (
    <section>
      {isLoading ? (
        <div className="center_spinner">
          <SpinLoading />
        </div>
      ) : null}

      {space && !isLoading ? (
        <section className="details-page">
          <div className="details-section">
            <div>
              <DetailsImage
                width="600"
                height="600"
                src={space.image}
                className="details_image"
                alt="Space Details"
              />
            </div>
            <div className="space-details">
              <div className="space-main-details">
                <p className="space-name">{space.name}</p>
                <p className="space-desc">{space.description}</p>
              </div>
              <div>
                <ul className="details">
                  <li className="details-row span_space_details">
                    <span>Price</span>
                    <span>${space.price}</span>
                  </li>
                  <li className="details-row">
                    <span>Created:</span>
                    <span>{space.created_at.split('T')[0]}</span>
                  </li>
                  <li className="details-row span_space_details">
                    <span>ID:</span>
                    <span>{space.id}</span>
                  </li>
                </ul>
                <Link key="link1" to={`/spaces/${id}/reservation`}>
                  <div className="reserve-btn">
                    <span>Reserve</span>
                    <RightCircleOutlined />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="back-btn">
            <BackButton />
          </div>
        </section>
      ) : null}
    </section>
  );
};

export default Details;
