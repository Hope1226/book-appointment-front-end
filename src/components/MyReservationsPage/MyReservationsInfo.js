import React, { useEffect, useState } from 'react';
import {
  Avatar, Table, message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import MyReservationsHeader from './MyReservationsHeader';
import NoDataMessage from '../NoDataMessage';
import SpinLoading from '../Spinner';

import './style.css';

const MyReservationsInfo = () => {
  const navigate = useNavigate();

  const [myReservationsInfo, setMyReservationsInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      title: 'Space',
      dataIndex: 'spaceImage',
      key: 'spaceImage',

      align: 'center',
      render: (spaceImage) => (
        <>
          <Avatar
            key="imagen"
            size={80}
            shape="square"
            src={spaceImage}
          />
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'spaceName',
      key: 'spaceName',
      width: 100,
      align: 'center',
      render: (spaceName) => (
        <div
          key={spaceName}
          style={{ wordBreak: 'normal', fontSize: '15px' }}
        >
          {spaceName}
        </div>
      ),
    },
    {
      title: 'City',
      dataIndex: 'reservationCity',
      key: 'reservationCity',
      width: 70,
      align: 'center',
    },
    {
      title: 'Reservation Date',
      dataIndex: 'reservationDate',
      key: 'reservationDate',
      width: 70,
      align: 'center',
    },

  ];
  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const { token } = JSON.parse(localStorage.getItem('userInformation'));

      const response = await fetch('https://api-spaces.herokuapp.com/reservations', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      const backendResponseData = await response.json();
      const tempData = [];

      backendResponseData.forEach((reservation) => {
        tempData.push({
          key: reservation.id,
          spaceName: reservation.space.name,
          spaceImage: reservation.space.image,
          reservationCity: reservation.city,
          reservationDate: reservation.date,

        });
      });

      setMyReservationsInfo(tempData);
      setIsLoading(false);
    } catch (err) {
      message.error('An error has ocurred, try again!');
      navigate('/');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <>
      {isLoading
      && (
      <>
        <div className="center_spinner"><SpinLoading /></div>
      </>
      )}

      {!isLoading && (
      <>
        <MyReservationsHeader amountReservations={myReservationsInfo.length} />
        {myReservationsInfo.length
          ? (
            <>
              <div className="myreservation_container">
                <div className="table_container">

                  <Table columns={columns} dataSource={myReservationsInfo} pagination={false} />
                </div>
              </div>
            </>
          )
          : (
            <div className="myreservation_nodata">
              <NoDataMessage text="No Reservations found" />
            </div>
          )}
      </>
      )}
    </>
  );
};

export default MyReservationsInfo;
