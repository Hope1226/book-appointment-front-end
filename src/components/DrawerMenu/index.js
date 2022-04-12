import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Drawer } from 'antd';
import PropTypes from 'prop-types';
import MenuContent from './MenuContent';
import TitleLogo from '../../assets/images/title-logo.png';
import './style.css';

const DrawerMenu = ({ logedIn, admin }) => {
  const { userInformation } = useSelector((state) => state);
  const [visible, setVisible] = useState(false);

  const path = useLocation();
  let pathChecker = false;
  if (path.pathname === '/' || path.pathname === '/spaces') {
    if (userInformation) {
      pathChecker = true;
    }
  }

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  return (
    <>
      <button type="button" onClick={openMenu} id="hamburger-menu" className={pathChecker ? 'hamburger-menu-black' : 'hamburger-menu-white'}>
        <>
        </ >
      </button>

      <Drawer
        title={<img alt="Title Logo" src={TitleLogo} className="title-logo" />}
        placement="left"
        closable={false}
        onClose={closeMenu}
        visible={visible}
        key="left"

      >
        <MenuContent
          closeMenu={closeMenu}
          userLogedIn={logedIn}
          userAdmin={admin}
        />
      </Drawer>
    </>
  );
};

DrawerMenu.propTypes = {
  logedIn: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
};

export default DrawerMenu;
