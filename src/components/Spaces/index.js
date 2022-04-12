import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import Space from './space';
import SpinLoading from '../Spinner';
import NoDataMessage from '../NoDataMessage';
import './style.css';

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSpaces = async () => {
    try {
      setIsLoading(true);
      const { token } = JSON.parse(localStorage.getItem('userInformation'));
      const response = await fetch('https://api-spaces.herokuapp.com/spaces', { headers: { Authorization: token } });
      const data = await response.json();
      setSpaces(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      message.error(err.toString());
    }
  };

  useEffect(() => {
    getSpaces();
  }, []);

  return (
    <>
      {!isLoading && !spaces.length
        ? <div className="center_spinner"><NoDataMessage text="There is not Spaces Avaiable" /></div> : null}

      {isLoading && !spaces.length
        ? <div className="center_spinner"><SpinLoading /></div> : null}

      {!isLoading && spaces.length
        ? (
          <div className="spaces">
            <h2 className="spaces-title management-title">Space managment</h2>
            <div className="spaces-container">
              {spaces.map((target) => (
                <Space space={target} key={target.id} />
              ))}
            </div>

          </div>
        ) : null}
    </>
  );
};

export default Spaces;
