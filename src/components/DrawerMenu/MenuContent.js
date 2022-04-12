import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { logOut } from '../../redux/task';

import './style.css';

const MenuContent = ({ closeMenu, userLogedIn, userAdmin }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const userData = JSON.parse(localStorage.getItem('userInformation'));
    try {
      const backendResponse = await fetch('https://api-spaces.herokuapp.com/logout', {
        method: 'delete',
        headers: {
          Authorization: userData.token,
        },
      });
      const backendResponseData = await backendResponse.json();

      const backMessage = backendResponseData.message;
      dispatch(logOut());
      message.success(backMessage);
      localStorage.removeItem('userInformation');
      window.location.href = '/';
      closeMenu();
    } catch (err) {
      message.error(err);
    }
  };

  return (
    <>
      <nav className="nav_container">
        {userLogedIn
          ? (
            <ul className="ul_menu_container">
              <NavLink to="/" className="menu-options" onClick={closeMenu}>Spaces</NavLink>
              <NavLink to="/myreservations" className="menu-options" onClick={closeMenu}>My Reservations</NavLink>
              {userAdmin
                ? (
                  <>
                    <NavLink to="/new_space" className="menu-options" onClick={closeMenu}>Add spaces</NavLink>
                    <NavLink to="/spaces" className="menu-options" onClick={closeMenu}>Delete spaces</NavLink>
                  </>
                )
                : null }
              <NavLink to="/login" className="menu-options" onClick={handleLogout}>Log out</NavLink>
            </ul>
          )
          : (
            <ul className="ul_menu_container">
              <NavLink to="/" className="menu-options" onClick={closeMenu}>Spaces</NavLink>
              <NavLink to="/login" className="menu-options" onClick={closeMenu}>Log In</NavLink>
              <NavLink to="/signup" className="menu-options" onClick={closeMenu}>Sign Up</NavLink>
            </ul>
          )}
      </nav>
    </>
  );
};

MenuContent.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  userLogedIn: PropTypes.bool.isRequired,
  userAdmin: PropTypes.bool.isRequired,
};
export default MenuContent;
