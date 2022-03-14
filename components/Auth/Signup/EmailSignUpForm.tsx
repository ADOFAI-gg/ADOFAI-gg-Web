import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  AuthButton,
  AuthInput,
  LabelledInputField
} from '@components/Auth/FormFields';
import { useTranslation } from 'react-i18next';

interface FormValues {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

const validation = yup.object().shape({
  email: yup.string().email().required('errors:form.required'),
  username: yup.string().required('errors:form.required'),
  password: yup
    .string()
    .min(6, 'auth:errors.password')
    .max(32, 'auth:errors.password')
    .required('auth:errors:form.required'),
  passwordConfirm: yup
    .string()
    .required('errors:form.required')
    .oneOf([yup.ref('password'), null], 'auth:errors.passwordNotMatch')
});

const EmailSignUpForm: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<FormValues>({
    resolver: yupResolver(validation)
  });

  const { t } = useTranslation('auth');

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        onFinish();
      })}
      style={{ marginTop: 64 }}
    >
      <LabelledInputField
        label={t('methods.email.email.label')}
        inputProps={{
          placeholder: t('methods.email.email.placeholder'),
          ...register('email')
        }}
        error={errors.email?.message}
      />
      <LabelledInputField
        label={t('methods.email.username.label')}
        inputProps={{
          placeholder: t('methods.email.username.placeholder'),
          ...register('username')
        }}
        error={errors.username?.message}
      />
      <LabelledInputField
        label={t('methods.email.password.label')}
        inputProps={{
          placeholder: t('methods.email.password.placeholder'),
          type: 'password',
          ...register('password')
        }}
        error={errors.password?.message}
      />
      <LabelledInputField
        label={t('methods.email.passwordConfirm.label')}
        inputProps={{
          placeholder: t('methods.email.passwordConfirm.placeholder'),
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
        {t('signUpButton')}
      </AuthButton>
    </form>
  );
};

export default EmailSignUpForm;
