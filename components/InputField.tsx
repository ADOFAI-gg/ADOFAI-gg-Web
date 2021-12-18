import React, { LegacyRef } from 'react';
import styled, { css } from 'styled-components';

export type InputType = 'home' | 'searchPage';

const Container = styled.div<{ inputType?: InputType }>`
  width: 100%;
  display: flex;
  border-radius: 5px;
  font-weight: 300;
  font-size: 16px;
  color: white;
  gap: 5px;
  align-items: center;

  ${({ inputType = 'searchPage' }) => {
    switch (inputType) {
      case 'searchPage':
        return css`
          padding: 5px 5px 5px 10px;
          background-color: rgba(255, 255, 255, 0.2);
        `;

      case 'home':
        return css`
          position: relative;
          border-radius: 100px;
          padding: 0 13px;
          height: 34px;
          background-color: rgba(255, 255, 255, 0.2);
        `;
    }
  }}
`;

const Input = styled.input<{ inputType?: InputType }>`
  flex-grow: 1;
  border: none;
  background: transparent;
  color: white;

  outline: none;

  &::placeholder {
    color: white;
    opacity: 0.4;
    transition: opacity 0.4s ease;
  }

  &:focus::placeholder {
    opacity: 0.2;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  /* Firefox */
  @supports (-moz-appearance: textfield) {
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;

const InputField = React.forwardRef<
  HTMLInputElement,
  Partial<{
    containerProps: React.HTMLAttributes<any>;
    inputType: InputType;
    leftIcon: React.ReactNode;
  }> &
    React.InputHTMLAttributes<HTMLInputElement>
>(({ containerProps, inputType, leftIcon, ...props }, ref) => {
  return (
    <Container inputType={inputType} {...containerProps}>
      {leftIcon && leftIcon}
      <Input {...props} inputType={inputType} ref={ref} />
    </Container>
  );
});

InputField.displayName = 'InputField';

export default InputField;
