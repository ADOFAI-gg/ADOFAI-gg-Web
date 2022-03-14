import React from 'react';
import Router, { useRouter } from 'next/router';
import { OAuth2Provider } from '@components/Auth/Signup/OAuth2SignUpForm';
import { FaDiscord, FaGoogle, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Logo from '@assets/icon.png';
import {
  AuthButton,
  AuthInput,
  LabelledInputField
} from '@components/Auth/FormFields';
import { useForm } from 'react-hook-form';
import { faker } from '@faker-js/faker';
import * as yup from 'yup';

export interface OAuth2CallbackData {
  id: string;
  username: string;
}
const schema = yup.object().shape({
  id: yup.string().required(),
  username: yup.string().required()
});

const OAuth2Callback: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    if (!window.opener) {
      Router.push('/').then();
    }
  }, []);

  const Icon = React.useMemo(() => {
    switch (router.query.provider as OAuth2Provider) {
      case OAuth2Provider.DISCORD:
        return FaDiscord;
      case OAuth2Provider.GOOGLE:
        return FaGoogle;
    }
  }, [router.query.provider]);

  const { register, handleSubmit } = useForm<OAuth2CallbackData>({
    defaultValues: {
      id: faker.datatype.uuid(),
      username: faker.name.findName()
    }
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        (window.opener as Window).dispatchEvent(
          new CustomEvent<OAuth2CallbackData>('oauth2Callback', {
            detail: data
          })
        );
      })}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'column',
        padding: 32,
        color: 'rgba(255, 255, 255, 0.6)'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center'
        }}
      >
        <Image
          src={Logo}
          alt='Adofai.gg'
          width={32}
          height={32}
          draggable='false'
        />
        <FaTimes />
        <Icon size={32} />
      </div>
      <div style={{ fontSize: 24, marginTop: 24, textAlign: 'center' }}>
        OAuth2 Test - {router.query.provider}
      </div>
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          width: '100%',
          flexDirection: 'column'
        }}
      >
        <LabelledInputField
          label='Provider'
          inputProps={{ defaultValue: router.query.provider, disabled: true }}
        />
        <LabelledInputField
          label='ID'
          inputProps={{
            placeholder: 'OAuth2 User ID',
            ...register('id'),
            readOnly: true
          }}
        />
        <LabelledInputField
          label='Username'
          inputProps={{
            placeholder: 'OAuth2 Username',
            ...register('username')
          }}
        />
        <AuthButton type='submit' as='button' style={{ marginTop: 12 }}>
          Submit
        </AuthButton>
      </div>
    </form>
  );
};

export default OAuth2Callback;
