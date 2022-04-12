import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message, DatePicker } from 'antd';
import SpinLoading from '../Spinner';

import './style.css';

const NewReservationForm = () => {
  const [selectedSpaceInfo, setselectedSpaceInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [reservationData, setReservationData] = useState({ city: '', date: '', space_id: undefined });

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchSpaces = async () => {
    try {
      setIsLoading(true);
      const { token } = JSON.parse(localStorage.getItem('userInformation'));

      const response = await fetch(`https://api-spaces.herokuapp.com/spaces/${id}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const backendResponseData = await response.json();
      setselectedSpaceInfo(backendResponseData);
      setReservationData({ ...reservationData, space_id: id });
      setIsLoading(false);
    } catch (err) {
      message.error('An error has ocurred, try again!');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const formCityHandler = (e) => {
    const input = e.target.value;
    setReservationData({ ...reservationData, city: input });
  };

  function formDateHandler(date, dateString) {
    setReservationData({ ...reservationData, date: dateString });
  }

  const submitLogin = async () => {
    const { token } = JSON.parse(localStorage.getItem('userInformation'));
    if (reservationData.date.length && reservationData.city.length && token) {
      try {
        setIsLoading(true);
        await fetch('https://api-spaces.herokuapp.com/reservations', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            reservation: {
              city: reservationData.city,
              date: reservationData.date,
              space_id: reservationData.space_id,
            },
          }),
        });

        message.success('New Reservation Saved');
        setIsLoading(false);
        navigate('/');
      } catch (err) {
        message.error(err);
      }
    } else {
      message.warning('The inputs cannot we blank!');
    }
  };

  return (
    <>
      {isLoading
        ? <div className="center_spinner"><SpinLoading /></div>
        : (
          <>
            <div className="login_container">
              {selectedSpaceInfo && (
              <div className="session">
                <div className="image-data" id="">
                  <img alt="" src={selectedSpaceInfo.image} width="200" />
                  <span className="price_span">
                    $
                    {selectedSpaceInfo.price}
                    <br />
                    <span className="price_span_little">/Per Day</span>
                  </span>
                </div>
                <div action="" className="log-in" autoComplete="off">
                  <div className="mobileImage_container">
                    <img src={selectedSpaceInfo.image} alt="mobileImage" className="mobileImage" width="200" />
                  </div>
                  <h4 className="login_title">
                    Reserve in:
                    <span className="login_span">
                      {selectedSpaceInfo.name}
                    </span>
                  </h4>
                  <p className="login_p">{selectedSpaceInfo.description}</p>
                  <div className="floating-label">
                    <input placeholder="City" className="login_input" type="text" name="city" onChange={(e) => formCityHandler(e)} id="city" />
                    <div className="icon">
                      <ion-icon name="mail-outline" class="email_icon" />

                    </div>
                  </div>
                  <div className="floating-label">
                    <div className="datePicker_Container">
                      <DatePicker className="datePicker" onChange={(date, dateString) => formDateHandler(date, dateString)} />
                    </div>
                    <div className="icon">
                      <ion-icon name="calendar-outline" class="email_icon" />
                    </div>

                  </div>
                  <button type="submit" onClick={submitLogin} className="login_button">Reserve Now!</button>
                </div>
              </div>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default NewReservationForm;
