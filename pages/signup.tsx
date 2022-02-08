import React from 'react';
import { NextPage } from 'next';
import Container from '@components/Auth/AuthCardContainer';
import {
  AuthButton,
  AuthCheckbox,
  LabelledInputField,
  LabelledSelect
} from '@components/Auth/FormFields';

const Login: NextPage = () => {
  return (
    <Container>
      <div
        style={{
          fontWeight: 300,
          fontSize: 36,
          textAlign: 'center',
          marginBottom: 40
        }}
      >
        Sign Up
      </div>
      <LabelledInputField
        label='Email Address'
        inputProps={{ placeholder: 'Your email address' }}
        error='Invalid email address'
      />
      <LabelledInputField
        label='Username'
        inputProps={{ placeholder: 'Your username' }}
        error='Username already exists'
      />
      <LabelledInputField
        label='Password'
        inputProps={{ placeholder: 'Your password', type: 'password' }}
        error='Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
      />
      <LabelledInputField
        label='Confirm Password'
        inputProps={{ placeholder: 'Confirm your password', type: 'password' }}
        error="Password doesn't match"
      />
      <LabelledSelect label='Country' error='Please select your country' />
      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 16 }}>Terms</div>
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            opacity: 0.8
          }}
        >
          <div style={{ display: 'flex' }}>
            <AuthCheckbox label='I agree to the Terms of Service' />
          </div>
          <div style={{ display: 'flex' }}>
            <AuthCheckbox label='I agree to the Privacy Policy' />
          </div>
        </div>
      </div>
      <AuthButton style={{ marginTop: 32 }}>Sign Up</AuthButton>
    </Container>
  );
};

export default Login;
