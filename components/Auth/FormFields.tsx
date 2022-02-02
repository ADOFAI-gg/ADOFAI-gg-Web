import styled from 'styled-components';

export const AuthInput = styled.input`
  padding-top: 7px;
  padding-bottom: 7px;
  background: transparent;
  outline: none;
  border: none;
  width: 480px;
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
