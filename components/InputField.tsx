import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
`;

export type InputType = 'home' | 'searchPage';

const Input = styled.input<{ inputType?: InputType }>`
  flex-grow: 1;
  border-radius: 5px;
  font-weight: 300;
  font-size: 15px;
  color: white;
  border: none;

  ${({ inputType = 'searchPage' }) => {
    switch (inputType) {
      case 'searchPage':
        return css`
          padding: 5px 5px 5px 10px;
          background-color: rgba(255, 255, 255, 0.3);
        `;

      case 'home':
        return css`
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.3);
        `;
    }
  }}

  outline: none;

  &::placeholder {
    color: white;
    opacity: 0.3;
  }
`;

const InputField: React.FC<
  React.InputHTMLAttributes<any> & {
    containerProps?: React.HTMLAttributes<any>;
    inputType?: InputType;
  }
> = ({ containerProps, inputType, ...props }) => {
  return (
    <Container {...containerProps}>
      <Input {...props} inputType={inputType} />
    </Container>
  );
};

export default InputField;
