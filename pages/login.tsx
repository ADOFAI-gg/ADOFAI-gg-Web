import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  margin: auto;
  padding: 64px;
  background: rgba(0, 2, 15, 0.2);
  border-radius: 16px;
`;

const Input = styled.input`
  padding-top: 7px;
  padding-bottom: 7px;
  background: transparent;
  outline: none;
  border: none;
  width: 480px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  &::placeholder {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
  }
  display: block;
  color: #fff;
`;

const StyledLink = styled.a`
  font-weight: 400;
  font-size: 14px;
  opacity: 0.8;
  text-decoration: underline;
  transition: all ease 0.2s;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const CheckboxContent = styled.div``;

const Checkbox = styled.label`
  input {
    display: none;
  }
  input:checked + ${CheckboxContent} {
    div {
      background: #fff;
    }
  }
  ${CheckboxContent} {
    display: flex;
    align-items: center;
    gap: 6px;
    opacity: 0.4;
    div {
      border: 1px solid rgb(255, 255, 255);
      width: 13px;
      height: 13px;
      border-radius: 3px;
    }
  }
  input:checked + ${CheckboxContent} {
    opacity: 1;
  }
`;

const Button = styled.div`
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 30px;
  cursor: pointer;
  transition: background-color ease 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Login: NextPage = () => {
  return (
    <Container>
      <div style={{ fontWeight: 300, fontSize: 36, textAlign: 'center' }}>
        Sign In
      </div>
      <Input
        placeholder='Email Address or username'
        style={{ marginTop: 24 }}
      />
      <Input placeholder='Password' style={{ marginTop: 11 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 11
        }}
      >
        <Checkbox style={{ display: 'flex' }}>
          <input type='checkbox' />
          <CheckboxContent>
            <div />
            <span>Stay logged in</span>
          </CheckboxContent>
        </Checkbox>
        <StyledLink>Forgot your password?</StyledLink>
      </div>
      <Button style={{ marginTop: 16 }}>Sign in</Button>
      <div
        style={{
          marginTop: 30,
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.6)'
        }}
      >
        New to ADOFAI.GG?{' '}
        <Link href='/signup' passHref>
          <StyledLink
            style={{
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'underline'
            }}
          >
            Sign Up
          </StyledLink>
        </Link>
      </div>
    </Container>
  );
};

export default Login;
