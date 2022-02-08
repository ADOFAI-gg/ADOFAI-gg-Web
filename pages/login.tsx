import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Container from '@components/Auth/AuthCardContainer';
import {
  AuthButton,
  AuthCheckbox,
  AuthInput,
  AuthLink
} from '@components/Auth/FormFields';

const Login: NextPage = () => {
  return (
    <Container>
      <div style={{ fontWeight: 300, fontSize: 36, textAlign: 'center' }}>
        Sign In
      </div>
      <AuthInput
        placeholder='Email Address or username'
        style={{ marginTop: 24 }}
      />
      <AuthInput placeholder='Password' style={{ marginTop: 11 }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 11
        }}
      >
        <AuthCheckbox style={{ opacity: 0.4 }} label='Stay logged in' />
        <AuthLink>Forgot your password?</AuthLink>
      </div>
      <AuthButton style={{ marginTop: 16 }}>Sign in</AuthButton>
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
        <Link href={'/signup'} passHref>
          <AuthLink
            style={{
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'underline'
            }}
          >
            Sign Up
          </AuthLink>
        </Link>
      </div>
    </Container>
  );
};

export default Login;
