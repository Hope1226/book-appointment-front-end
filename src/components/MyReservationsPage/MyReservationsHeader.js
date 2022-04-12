import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import './style.css';

const MyReservationsHeader = ({ amountReservations }) => {
  const { userInformation } = useSelector((state) => state);

  return (
    <>
      { userInformation && (
      <>
        <div className="profile-container">
          <div className="profile_items">
            <div className="profile_img">
              <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="profile_image" width="100" />
            </div>
            <div className="profile_content">
              <div className="profile_span_container">
                <span className="profile_joined">
                  Joined:
                  {' '}
                  {userInformation.joined}
                </span>
                <div className="profile_username">{userInformation.name}</div>
              </div>
              <div className="profile_right_info">
                <h2 className="profile_user_counter" id="profile_user_counter">{amountReservations}</h2>

              </div>
            </div>
          </div>

        </div>
      </>
      )}
    </>
  );
};

MyReservationsHeader.propTypes = {
  amountReservations: PropTypes.number.isRequired,
};

export default MyReservationsHeader;
