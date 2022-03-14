import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AuthButton,
  AuthInput,
  LabelledInputField
} from '@components/Auth/FormFields';

interface FormValues {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

const validation = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(6).max(32).required(),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], "Password doesn't match")
});

const EmailSignUpForm: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<FormValues>({
    resolver: yupResolver(validation)
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        onFinish();
      })}
      style={{ marginTop: 64 }}
    >
      <LabelledInputField
        label='Email Address'
        inputProps={{ placeholder: 'Your email address', ...register('email') }}
        error={errors.email?.message}
      />
      <LabelledInputField
        label='Username'
        inputProps={{ placeholder: 'Your username', ...register('username') }}
        error={errors.username?.message}
      />
      <LabelledInputField
        label='Password'
        inputProps={{
          placeholder: 'Your password',
          type: 'password',
          ...register('password')
        }}
        error={errors.password?.message}
      />
      <LabelledInputField
        label='Confirm Password'
        inputProps={{
          placeholder: 'Confirm your password',
          type: 'password',
          ...register('passwordConfirm')
        }}
        error={errors.passwordConfirm?.message}
      />
      <AuthButton
        as='button'
        type='submit'
        style={{
          height: 42,
          marginTop: 24,
          background: 'rgba(77, 147, 252, var(--button-opacity))',
          color: 'rgba(255, 255, 255, 0.8)'
        }}
      >
        Sign Up
      </AuthButton>
    </form>
  );
};

export default EmailSignUpForm;
