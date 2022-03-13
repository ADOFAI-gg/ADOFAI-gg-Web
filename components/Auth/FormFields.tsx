import styled from 'styled-components';
import React from 'react';
import showPW from '@assets/icons/showPassword.svg';
import hidePW from '@assets/icons/hidePassword.svg';
import Select, { IndicatorsContainerProps } from 'react-select';

export const AuthCheckbox: React.FC<
  {
    label: React.ReactNode;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    error?: string;
  } & React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ label, inputProps, error, ...props }) => {
  return (
    <div>
      <AuthCheckboxContainer {...props}>
        <input type='checkbox' {...inputProps} />
        <AuthCheckboxContent>
          <div>
            <span>
              <svg
                width='9'
                height='8'
                viewBox='0 0 9 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 3.32943L3.43711 6L8 1'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </svg>
            </span>
          </div>
          <span style={{ fontSize: 14 }}>{label}</span>
        </AuthCheckboxContent>
      </AuthCheckboxContainer>
      {error && (
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
          <ErrorDot />
          <span style={{ color: '#F54F51', fontSize: 14 }}>{error}</span>
        </div>
      )}
    </div>
  );
};

export const AuthInput = styled.input`
  width: 100%;
  padding-top: 7px;
  padding-bottom: 7px;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  &::placeholder {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
  }
  display: block;
  color: #fff;
`;

export const AuthLink = styled.a`
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

export const AuthCheckboxContent = styled.div``;

const AuthCheckboxContainer = styled.label`
  input {
    display: none;
  }
  input:checked + ${AuthCheckboxContent} {
    div {
      span {
        display: block;
      }
    }
  }
  ${AuthCheckboxContent} {
    display: flex;
    align-items: center;
    gap: 6px;
    div {
      border: 1px solid rgb(255, 255, 255);
      width: 13px;
      height: 13px;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        width: 8px;
        height: 24px;
        display: none;
      }
    }
  }
`;

export const AuthButton = styled.div`
  --button-opacity: 0.2;

  background: rgba(255, 255, 255, var(--button-opacity));
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 30px;
  cursor: pointer;
  transition: background-color ease 0.2s;
  width: 100%;
  outline: none;
  border: none;
  color: #fff;
  font-size: 16px;

  &:hover {
    --button-opacity: 0.4;

    text-decoration: none;
  }
`;

const LabelledInputFieldInput = styled.input`
  background: transparent;
  outline: none;
  border: none;
  flex-grow: 1;
  font-size: 16px;
  color: #fff;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const ErrorDot = styled.span`
  background: #f54f51;
  width: 6px;
  height: 6px;
  margin-right: 4px;
  border-radius: 3px;
`;

const CustomIndicatorsContainer: React.FC<IndicatorsContainerProps> = () => {
  return (
    <div>
      <svg
        width='10'
        height='8'
        viewBox='0 0 10 8'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          opacity='0.4'
          d='M5 8L0.669872 0.5L9.33013 0.5L5 8Z'
          fill='white'
        />
      </svg>
    </div>
  );
};

const LabelledSelectContainer = styled.div`
  div[data-value] {
    padding-top: 0;
    padding-bottom: 0;
  }
  .select {
    color: #000;
  }
`;

export const LabelledSelect: React.FC<{
  label: string;
  error?: React.ReactNode;
  options: { label: string; value: string }[];
  onChange?: (value: string | null) => void;
  value?: string;
}> = ({ label, error, options, value, onChange }) => {
  return (
    <LabelledSelectContainer>
      <div
        style={{
          marginTop: 24,
          borderBottom: '1px solid rgba(255,255,255,0.4)',
          paddingBottom: 6
        }}
      >
        <div style={{ fontSize: 16 }}>{label}</div>
        <div
          style={{
            gap: 10,
            marginTop: 8,
            paddingRight: 2
          }}
          className='select'
        >
          <Select
            value={
              value
                ? options.find((x) => x.value === value) || undefined
                : undefined
            }
            onChange={
              ((option: { value: string } | null) => {
                onChange?.(option?.value ?? null);
              }) as () => void
            }
            options={options}
            styles={{
              control: () => ({
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center'
              }),
              indicatorSeparator: () => ({}),
              valueContainer: (styles) => ({
                ...styles,
                padding: 0
              }),
              placeholder: (styles) => ({
                ...styles,
                color: 'rgba(255, 255, 255, 0.6)'
              }),
              input: (styles) => ({
                ...styles,
                color: '#fff'
              }),
              singleValue: (styles) => ({
                ...styles,
                color: '#fff'
              })
            }}
            components={{ IndicatorsContainer: CustomIndicatorsContainer }}
          />
        </div>
      </div>
      {error && (
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
          <ErrorDot />
          <span style={{ color: '#F54F51', fontSize: 14 }}>{error}</span>
        </div>
      )}
    </LabelledSelectContainer>
  );
};

export const LabelledInputField: React.FC<{
  label: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: React.ReactNode;
}> = ({ label, inputProps, error }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div>
      <div
        style={{
          marginTop: 24,
          borderBottom: '1px solid rgba(255,255,255,0.4)',
          paddingBottom: 6
        }}
      >
        <div style={{ fontSize: 16 }}>{label}</div>
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            marginTop: 8,
            paddingRight: 2
          }}
        >
          <LabelledInputFieldInput
            {...(inputProps.type === 'password'
              ? { ...inputProps, type: showPassword ? 'text' : 'password' }
              : inputProps)}
            autoComplete='off'
          />
          {inputProps.type === 'password' && (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={showPassword ? hidePW.src : showPW.src}
                draggable='false'
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword((v) => !v)}
                alt=''
              />
            </div>
          )}
        </div>
      </div>
      {error && (
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center' }}>
          <ErrorDot />
          <span style={{ color: '#F54F51', fontSize: 14 }}>{error}</span>
        </div>
      )}
    </div>
  );
};
