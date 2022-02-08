import styled from 'styled-components';
import React from 'react';
import showPW from '@assets/icons/showPassword.svg';
import hidePW from '@assets/icons/hidePassword.svg';

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

export const AuthCheckbox = styled.label`
  input {
    display: none;
  }
  input:checked + ${AuthCheckboxContent} {
    div {
      background: #fff;
    }
  }
  ${AuthCheckboxContent} {
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
  input:checked + ${AuthCheckboxContent} {
    opacity: 1;
  }
`;

export const AuthButton = styled.div`
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

const ErrorDot = styled.span`
  background: #f54f51;
  width: 6px;
  height: 6px;
  margin-right: 4px;
  border-radius: 3px;
`;

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
