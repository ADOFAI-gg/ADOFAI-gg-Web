import React from 'react';
import styled from 'styled-components';

const Error404Page = ({ history }) => {
  const handleBackButton = () => {
    if (history.length > 1) {
      history.goBack();
    } else {
      history.push('/');
    }
  };

  const ContentContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1100px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  const Image = styled.img`
    width: 100%;
    border-radius: 12px;
    box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.5);
  `;

  const TextContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 88px;
    left: 60px;
    transform: skew(358deg, 340deg);
    text-shadow: 0 0 12px;
  `;

  const Title = styled.h1`
    width: 100%;
    font-size: 32px;
    margin-bottom: 8px;
    font-weight: bold;
  `;

  const Button = styled.button`
    border: none;
    background: none;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    margin-top: 8px;
    padding: 8px;
    border-radius: 6px;
    box-shadow: 0px 0px 6px rgba(255, 255, 255, 0.25);
    transition: 0.2s;

    &:hover {
      background: #fff;
      color: #000;
    }
  `;

  return (
    <main>
      <ContentContainer>
        <Image
          src='/other_image/beautiful-planets.jpg'
          alt='very nice planets'
        />

        <TextContainer>
          <Title>Error 404</Title>
          Page not found. Instead, we'll show you a great picture of the planet.
          <Button onClick={handleBackButton}>Go Back</Button>
        </TextContainer>
      </ContentContainer>
    </main>
  );
};

export default Error404Page;
