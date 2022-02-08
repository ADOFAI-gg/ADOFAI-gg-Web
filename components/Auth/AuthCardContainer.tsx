import styled from 'styled-components';
import React from 'react';

const Container = styled.div`
  padding: 64px;
  background: rgba(0, 2, 15, 0.2);
  border-radius: 16px;
  width: 100%;
`;

const StyledLink = styled.a`
  font-size: 14px;
  font-weight: 400;
  opacity: 0.6;
  transition: all ease 0.2s;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 1;
  }
`;

const AuthCardContainer: React.FC = ({ children }) => {
  return (
    <div
      style={{
        height: 'fit-content',
        margin: 'auto',
        maxWidth: 520,
        width: '100%'
      }}
    >
      <Container>{children}</Container>
      <div
        style={{
          display: 'flex',
          marginTop: 16,
          justifyContent: 'flex-end',
          gap: 24
        }}
      >
        <StyledLink>법적 고지</StyledLink>
        <StyledLink>서비스 이용 약관</StyledLink>
        <StyledLink>개인정보 처리 방침</StyledLink>
      </div>
    </div>
  );
};

export default AuthCardContainer;
