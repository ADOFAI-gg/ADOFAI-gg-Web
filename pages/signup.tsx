import React from 'react';
import { NextPage } from 'next';
import AuthCardContainer from '@components/Auth/AuthCardContainer';
import {
  AuthButton,
  AuthCheckbox,
  ErrorDot
} from '@components/Auth/FormFields';
import { FaGoogle, FaDiscord } from 'react-icons/fa';

const SignUp: NextPage = () => {
  return (
    <AuthCardContainer>
      <div style={{ fontWeight: 300, fontSize: 36, textAlign: 'center' }}>
        Sign Up
      </div>
      <div style={{ marginTop: 64 }}>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Terms</div>
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', opacity: 0.8 }}>
            <AuthCheckbox label='I agree to the Terms of Service' />
            <div style={{ flexGrow: 1 }} />
            <a style={{ fontSize: 14, textDecoration: 'underline' }}>
              See full terms of Service
            </a>
          </div>
          <div style={{ display: 'flex', opacity: 0.8 }}>
            <AuthCheckbox label='I agree to the Privacy Policy' />
            <div style={{ flexGrow: 1 }} />
            <a style={{ fontSize: 14, textDecoration: 'underline' }}>
              See full Privacy Policy
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 8, alignItems: 'center' }}>
          <ErrorDot />
          <span style={{ color: '#F54F51', fontSize: 14 }}>
            You must agree to all conditions
          </span>
        </div>
        <AuthButton
          style={{
            height: 42,
            marginTop: 24,
            background: 'rgba(77, 147, 252, var(--button-opacity))'
          }}
        >
          Sign Up with Email
        </AuthButton>
        <div
          style={{
            marginTop: 32,
            height: 26,
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <div
            style={{
              flexGrow: 1,
              height: 1,
              background: 'rgba(255, 255, 255, 0.4)'
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 400, opacity: 0.8 }}>
            Or sign up with
          </span>
          <div
            style={{
              flexGrow: 1,
              height: 1,
              background: 'rgba(255, 255, 255, 0.4)'
            }}
          />
        </div>
        <div style={{ display: 'flex', marginTop: 12, gap: 12 }}>
          <AuthButton style={{ height: 42, flexGrow: 1, width: 0 }}>
            <FaGoogle size={22} />
          </AuthButton>
          <AuthButton style={{ height: 42, flexGrow: 1, width: 0 }}>
            <FaDiscord size={22} />
          </AuthButton>
        </div>
      </div>
    </AuthCardContainer>
  );
};

export default SignUp;
