/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

const Space = ({ space }) => {
  const resetButton = (btnId) => {
    const targetBtn = document.getElementById(btnId);
    targetBtn.disabled = true;
  };

  const removeSpace = async (spaceId) => {
    const { token } = JSON.parse(localStorage.getItem('userInformation'));
    try {
      fetch(`http://localhost:3000/spaces/${spaceId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          space: {
            removed: true,
          },
        }),
      });
      resetButton(spaceId);
      message.success('Space removed successfully');
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <div className="space-card" key={space.id}>
      <div className="space-main">
        <div className="space-imgae-container">
          <img src={space.image} alt="space" />
        </div>
        <div className="space-info">
          <div className="space-main-info">
            <h2>{space.name}</h2>
            <p>{space.description}</p>
          </div>
          <div className="space-footer">
            <small>
              Added:
              {space.created_at}
            </small>
            {space.removed ? <span className="archived">Archived</span> : <button id={space.id} type="button" className="remove-btns" onClick={() => removeSpace(space.id)}>Remove</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

Space.propTypes = {
  space: PropTypes.element.isRequired,
};

export default Space;