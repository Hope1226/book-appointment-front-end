import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import FirstImage from '../../assets/images/MainPage_NoLogin/first_banner.png';

import './style.css';
import '../../assets/stylesheets/button-29.css';

const FirstBannerMainPage = () => {
  const [modalState, setModalState] = useState(false);

  const showModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      <div>
        <div className="mainPage_NoLogin first_banner">
          <img src={FirstImage} alt="First_Banner" />
          <h2>FIND YOUR FLEXIBLE WORKSPACE</h2>
          <button className="button-29 see_spaces_button" type="button" onClick={showModal}>
            See Spaces
            <ion-icon name="caret-forward-circle-outline" class="see_spaces_icon" />
          </button>
        </div>
      </div>
      <Modal
        title="Pick an Image"
        visible={modalState}
        onOk={closeModal}
        footer={[<Button key="submit" type="primary" onClick={closeModal}>Ok</Button>]}
        closable={false}
        destroyOnClose
      >
        <iframe
          title="SpaceVideo"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/5-DZhgfpWxM"
        />
      </Modal>
    </>
  );
};

export default FirstBannerMainPage;
