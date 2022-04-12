import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import '../../assets/stylesheets/button-17.css';

const SecondBannerMainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="mainPage_NoLogin second_banner">
          <div className="second_banner_info_container">
            <div className="second_banner_info">
              <h2 className="second_banner_title">BOOK A SPACE FREE-TIME</h2>
              <hr className="second_banner_line_style" />
              <span className="second_banner_text">
                Spaces offers companies of all sizes the global scale and
                flexibility to adapt to uncertainty. Find the office space you
                need, where and when you need it. It&#39;s hybrid: designed for
                you by Spaces.
              </span>
              <div className="second_banner_button_container">
                <button onClick={() => navigate('/login')} className="button-17 sign_up_button" type="button">
                  <span>SIGN IN</span>
                  <ion-icon name="cloud-done-outline" class="sign_up_icon" />
                </button>
                <button onClick={() => navigate('/signup')} className="button-17 log_in_button" type="button">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondBannerMainPage;
