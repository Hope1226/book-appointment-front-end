import React from 'react';
import './style.css';

const ThirdBannerMainPage = () => (
  <>
    <div>
      <div className="mainPage_NoLogin third_banner">
        <h1 className="third_page_title">Contact Us</h1>
        <div className="third_page_contact_info">

          <div className="third_page_social_media_icons_container">
            <ion-icon name="logo-github" />
            <ion-icon name="logo-linkedin" />
            <ion-icon name="logo-twitter" />
            <ion-icon name="logo-linkedin" />
          </div>

          <span>Spaces are waiting for you!</span>
        </div>
      </div>
    </div>
  </>
);

export default ThirdBannerMainPage;
