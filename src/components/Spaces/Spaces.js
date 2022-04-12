import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, message } from 'antd';
import SpaceCard from './SpaceCard';
import '../../assets/stylesheets/spaces.css';
import SpinLoading from '../Spinner';
import NoDataMessage from '../NoDataMessage';

const Spaces = () => {
  const [slideShowToShow, setSlideShowToShow] = useState(3);
  const [spaces, setSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userInformation } = useSelector((state) => state);
  const admin = userInformation.role === 'admin';

  const fetchSpaces = async () => {
    try {
      setIsLoading(true);
      const { token } = JSON.parse(localStorage.getItem('userInformation'));
      const response = await axios.get('https://api-spaces.herokuapp.com/spaces', { headers: { Authorization: token } });
      response.data = response.data.filter((space) => space.removed === false);

      setSpaces(response.data);
      setIsLoading(false);
    } catch (err) {
      message.error('Error fetching the data, try again!');
    }
  };

  const updateDimensions = () => {
    if (window.innerWidth > 1120) {
      setSlideShowToShow(3);
    }

    if (window.innerWidth < 1120 && window.innerWidth > 795) {
      setSlideShowToShow(2);
    }

    if (window.innerWidth < 795) {
      setSlideShowToShow(1);
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    fetchSpaces();
  }, []);

  return (
    <>
      {!isLoading && !spaces.length && (
      <>

        <div className="center_spinner display_noSpaces">
          <NoDataMessage text="Oops! Looks like there is no Spaces available" />
          <br />
          {admin && <Link to="/new_space"><Button type="primary">Add new Space</Button></Link>}
        </div>

      </>
      )}
      {isLoading ? <div className="center_spinner"><SpinLoading /></div> : null}
      {spaces.length && !isLoading
        ? (
          <div>
            <div className="container_spaces_title">
              <h1 className="spaces-title">SPACES</h1>
              <span>Please select a Space Option</span>
            </div>
            <div className="container_spaces_width_ok">
              {spaces.length === 0
                ? (
                  <div>
                    <h1>No spaces available</h1>
                    <Link to="/new_space">
                      <Button type="primary">Create a space</Button>
                    </Link>
                  </div>
                )
                : (
                  <Carousel itemsToShow={slideShowToShow} itemPadding={[5]}>
                    {spaces.map((space) => {
                      if (space.removed === true) {
                        return null;
                      }
                      return (
                        <SpaceCard
                          key={space.id}
                          id={space.id}
                          name={space.name.toUpperCase()}
                          description={space.description}
                          price={space.price}
                          image={space.image}
                          hoverable={false}
                        />
                      );
                    })}
                  </Carousel>
                )}
            </div>
          </div>
        ) : null}
    </>
  );
};

export default Spaces;
