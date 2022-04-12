import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { userIsLogged } from '../../redux/task';
import SpinLoading from '../Spinner';
import '../LoginForm/style.css';
import './style.css';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const formDataHandler = (e, field) => {
    const input = e.target.value;
    switch (field) {
      case 'name':
        setLoginData({ ...loginData, name: input });
        break;

      case 'email':
        setLoginData({ ...loginData, email: input });
        break;

      case 'password':
        setLoginData({ ...loginData, password: input });
        break;

      case 'password_confirmation':
        setLoginData({ ...loginData, password_confirmation: input });
        break;

      default:
        break;
    }
  };

  const submitLogin = async () => {
    if (loginData.name.length
      && loginData.email.length
      && loginData.password.length
      && loginData.password_confirmation.length) {
      try {
        setIsLoading(true);
        const backendResponse = await fetch('https://api-spaces.herokuapp.com/signup', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              name: loginData.name,
              email: loginData.email,
              password: loginData.password,
              password_confirmation: loginData.password_confirmation,
            },
          }),
        });
        if (!backendResponse.ok) {
          throw new Error('Wrong data, check inputs, please try again');
        }

        const backendResponseData = await backendResponse.json();

        const token = backendResponse.headers.get('Authorization');
        dispatch(userIsLogged(token, backendResponseData.data));
        message.success(`Welcome, ${backendResponseData.data.name}!`);
        setIsLoading(false);
        navigate('/');
      } catch (err) {
        setIsLoading(false);
        message.error(err.toString());
      }
    } else {
      message.warning('The inputs cannot we blank!');
    }
  };

  return (
    <>
      {isLoading && <div className="center_spinner"><SpinLoading /></div>}
      {!isLoading
    && (
    <>
      <div className="login_container">
        <div className="session">
          <div action="" className="log-in" autoComplete="off">
            <h4 className="login_title">
              Welcome to
              <span className="login_span">SPACES</span>
            </h4>
            <p className="login_p">Find productive workspace for your needs, whether it&#39;s a single desk, a meeting room, or a private office.</p>
            <div className="floating-label">
              <input placeholder="Name" className="signup_input" type="text" name="name" onChange={(e) => formDataHandler(e, 'name')} id="name" autoComplete="off" />
              <div className="icon new_heigh_icon">
                <ion-icon name="person-outline" class="email_icon" />
              </div>
            </div>
            <div className="floating-label">
              <input placeholder="Email" className="signup_input" type="email" name="email" onChange={(e) => formDataHandler(e, 'email')} id="email" autoComplete="off" />
              <div className="icon new_heigh_icon">
                <ion-icon name="mail-outline" class="email_icon" />

              </div>
            </div>
            <div className="floating-label">
              <input placeholder="Password" className="signup_input" type="password" name="password" onChange={(e) => formDataHandler(e, 'password')} id="password" autoComplete="off" />
              <div className="icon new_heigh_icon">
                <ion-icon name="key-outline" class="email_icon" />
              </div>

            </div>
            <div className="floating-label">
              <input placeholder="Repeat password" className="signup_input" type="password" name="password_confirmation" onChange={(e) => formDataHandler(e, 'password_confirmation')} id="password_confirmation" autoComplete="off" />
              <div className="icon new_heigh_icon">
                <ion-icon name="key-outline" class="email_icon" />
              </div>

            </div>
            <button type="submit" onClick={submitLogin} className="login_button">Sign Up</button>
          </div>
          <div className="right" />

        </div>
      </div>
    </>
    )}
    </>
  );
};

export default SignupForm;
