import React from 'react';
import { NextPage } from 'next';
import Container from '@components/Auth/AuthCardContainer';
import {
  AuthButton,
  AuthCheckbox,
  LabelledInputField,
  LabelledSelect
} from '@components/Auth/FormFields';
import country from 'country-list-js';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface ISignupSchema {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
  country: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  passwordRepeat: yup
    .string()
    .required()
    .test('equal', 'Passwords do not match!', function (v) {
      const ref = yup.ref('password');
      return v === this.resolve(ref);
    }),
  country: yup.string().required(),
  agreeTerms: yup.boolean().required().oneOf([true]),
  agreePrivacy: yup.boolean().required().oneOf([true])
});

const Signup: NextPage = () => {
  const form = useForm<ISignupSchema>({
    resolver: yupResolver(schema)
  });

  return (
    <Container>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
      >
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
          inputProps={{
            placeholder: 'Your email address',
            ...form.register('email')
          }}
          error={form.formState.errors.email?.message}
        />
        <LabelledInputField
          label='Username'
          inputProps={{
            placeholder: 'Your username',
            ...form.register('username')
          }}
          error={form.formState.errors.username?.message}
        />
        <LabelledInputField
          label='Password'
          inputProps={{
            placeholder: 'Your password',
            type: 'password',
            ...form.register('password')
          }}
          error={form.formState.errors.password?.message}
        />
        <LabelledInputField
          label='Confirm Password'
          inputProps={{
            placeholder: 'Confirm your password',
            type: 'password',
            ...form.register('passwordRepeat')
          }}
          error={form.formState.errors.passwordRepeat?.message}
        />

        <Controller
          control={form.control}
          name='country'
          render={({ field: { onChange }, fieldState: { error } }) => (
            <LabelledSelect
              options={Object.entries(country.all).map(([k, v]) => ({
                value: k,
                label: v.name
              }))}
              label='Country'
              error={error?.message}
              onChange={onChange}
            />
          )}
        />
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
              <AuthCheckbox
                label='I agree to the Terms of Service'
                inputProps={form.register('agreeTerms')}
                error={form.formState.errors.agreeTerms?.message}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <AuthCheckbox
                label='I agree to the Privacy Policy'
                inputProps={form.register('agreePrivacy')}
                error={form.formState.errors.agreePrivacy?.message}
              />
            </div>
          </div>
        </div>
        <AuthButton as='button' type='submit' style={{ marginTop: 32 }}>
          Sign Up
        </AuthButton>
      </form>
    </Container>
  );
};

export default Signup;
