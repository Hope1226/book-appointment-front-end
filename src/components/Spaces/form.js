import React, { useState } from 'react';
import { message, Modal, Button } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import noImage from '../../assets/images/no_image.png';
import imageOne from '../../assets/images/MainPage_NoLogin/first_banner.png';
import imageTwo from '../../assets/images/spaces/banner_two.png';
import imageThree from '../../assets/images/spaces/banner_three.png';
import imageFour from '../../assets/images/spaces/banner_four.png';
import imageFive from '../../assets/images/spaces/banner_five.png';
import imageSix from '../../assets/images/spaces/banner_six.png';
import imageSeven from '../../assets/images/spaces/banner_seven.png';
import imageEight from '../../assets/images/spaces/banner_eight.png';
import imageNine from '../../assets/images/spaces/banner_nine.png';
import SpinLoading from '../Spinner';

const Form = () => {
  const navigate = useNavigate();

  const [modalState, setModalState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const imageList = [imageOne, imageTwo, imageThree, imageFour,
    imageFive, imageSix, imageSeven, imageEight, imageNine];

  const [spaceData, setSpaceData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const onPick = (image) => {
    setSpaceData({ ...spaceData, image: image.src });
  };

  const handleInput = (e, field) => {
    const input = e.target.value;
    switch (field) {
      case 'name':
        setSpaceData({ ...spaceData, name: input });
        break;

      case 'description':
        setSpaceData({ ...spaceData, description: input });
        break;

      case 'price':
        setSpaceData({ ...spaceData, price: parseFloat(input) });
        break;

      case 'image':
        setSpaceData({ ...spaceData, image: input });
        break;

      default:
        break;
    }
  };

  const handleSubmisson = async () => {
    if (spaceData.description.length
      && spaceData.price > 0
      && spaceData.image.length
      && spaceData.name.length) {
      setIsLoading(true);
      const { token } = JSON.parse(localStorage.getItem('userInformation'));
      try {
        fetch('https://api-spaces.herokuapp.com/spaces', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({
            space: {
              name: spaceData.name,
              description: spaceData.description,
              price: spaceData.price,
              image: spaceData.image,
            },
          }),
        });
        message.success('New space added successfully');
        setIsLoading(false);
        navigate('/');
      } catch (error) {
        setIsLoading(false);
        message.error(error);
      }
    } else {
      message.error('Input cannot be empty!');
    }
  };

  return (
    <>
      {isLoading && <div className="center_spinner"><SpinLoading /></div>}
      {!isLoading
    && (
    <>
      <div className="login_container">
        <div className="session new_spaces_width justify-content">
          <div action="" className="log-in add-space" autoComplete="off">
            <h4 className="login_title">
              Add new Space
            </h4>

            <input
              placeholder="Space Name"
              className="login_input space_input"
              type="text"
              name="spaceName"
              onChange={(e) => handleInput(e, 'name')}
              id="name"
              autoComplete="off"
            />

            <input
              placeholder="Price"
              className="login_input space_input"
              type="number"
              name="spacePrice"
              onChange={(e) => handleInput(e, 'price')}
              id="spacePrice"
              autoComplete="off"
            />

            <div className="space_image">
              <img width="75" height="75" src={spaceData.image.length ? spaceData.image : noImage} alt="Preview space" />
              <button type="button" onClick={showModal}>
                <CameraOutlined />
              </button>
            </div>

            <textarea
              placeholder="Description"
              className="login_input space_input sp_textarea"
              name="Description"
              onChange={(e) => handleInput(e, 'description')}
              id="description"
              autoComplete="off"
            />
            <button type="submit" onClick={handleSubmisson} className="login_button login_button_new">Add Space</button>
          </div>
        </div>
      </div>
      <Modal
        title="Pick an Image"
        visible={modalState}
        onOk={closeModal}
        footer={[<Button key="submit" type="primary" onClick={closeModal}>Ok</Button>]}
        closable={false}
      >
        <ImagePicker
          images={imageList.map((image, i) => ({ src: image, value: i }))}
          onPick={onPick}
        />
      </Modal>

    </>
    )}
    </>
  );
};

export default Form;
