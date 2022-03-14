import React from 'react';
import { toast } from 'react-toastify';
import { OAuth2CallbackData } from '../../../pages/auth/oauth2/[provider]';
import { TailSpin } from 'react-loader-spinner';
import { AuthButton, LabelledInputField } from '@components/Auth/FormFields';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export enum OAuth2Provider {
  GOOGLE = 'google',
  DISCORD = 'discord'
}

const schema = yup.object().shape({
  username: yup.string().required()
});

const OAuth2SignUpForm: React.FC<{
  provider: OAuth2Provider;
  onCancel: () => void;
  onFinish: () => void;
}> = ({ provider, onCancel, onFinish }) => {
  const popup = React.useRef<Window | null>();
  const [initialData, setInitialData] =
    React.useState<OAuth2CallbackData | null>(null);

  React.useEffect(() => {
    if (initialData) return;

    popup.current = window.open(
      `/auth/oauth2/${provider}`,
      'Authenticate',
      'width=360,height=640'
    );

    const interval = setInterval(() => {
      if (popup.current?.closed) {
        clearInterval(interval);
        toast.error('Popup closed');
        onCancel();
      }
    }, 1000);

    const onCallback = (ev: Event) => {
      const e = ev as CustomEvent<OAuth2CallbackData>;
      setInitialData(e.detail);
    };

    window.addEventListener('oauth2Callback', onCallback);

    return () => {
      window.removeEventListener('oauth2Callback', onCallback);
      clearInterval(interval);
      popup.current?.close();
    };
  }, [onCancel, provider, setInitialData, initialData]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<{ username: string }>({
    defaultValues: {},
    resolver: yupResolver(schema)
  });

  React.useEffect(() => {
    if (initialData) {
      reset({ username: initialData.username });
    }
  }, [initialData, reset]);

  return (
    <>
      {initialData ? (
        <form
          style={{ marginTop: 64 }}
          onSubmit={handleSubmit((data) => {
            console.log(data);
            onFinish();
          })}
        >
          <LabelledInputField
            label='Username'
            inputProps={{
              placeholder: 'Your username',
              ...register('username')
            }}
            error={errors.username?.message}
          />
          <AuthButton as='button' type='submit' style={{ marginTop: 24 }}>
            Sign Up
          </AuthButton>
        </form>
      ) : (
        <div
          style={{ marginTop: 64, display: 'flex', justifyContent: 'center' }}
        >
          <TailSpin color='#fff' />
        </div>
      )}
    </>
  );
};

export default OAuth2SignUpForm;
