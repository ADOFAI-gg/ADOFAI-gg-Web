import React from 'react';
import styled from 'styled-components';

const Error404Page = ({ history }) => {
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
    text-shadow: 0 0 8px black;
    font-size: 18px;
  `;

  const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 8px;
    font-weight: bold;
  `;

  return (
    <main>
      <ContentContainer>
        <Title>Error 404</Title>
        This page does not exist.
      </ContentContainer>
    </main>
  );
};

export default Error404Page;
