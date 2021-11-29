import React from 'react';
import { NextPage } from 'next';
import InputField from '@components/InputField';
import Image from 'next/image';
import SearchIcon from '@assets/icons/search.svg';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FilterIcon from '@assets/icons/filter.svg';
import SortIcon from '@assets/icons/sort.svg';

const IconContainer = styled.div`
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
`;

const Levels: NextPage = () => {
  const { t } = useTranslation('main');

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <InputField
          containerProps={{
            style: {
              flexGrow: 1,
              width: 0
            }
          }}
          inputType='home'
          leftIcon={
            <Image
              alt=''
              onDragStart={(e) => e.preventDefault()}
              src={SearchIcon}
              width={17.5}
              height={18.79}
            />
          }
          placeholder={t('searchPlaceholder')}
        />
        <IconContainer onDragStart={(e) => e.preventDefault()}>
          <Image alt='' src={FilterIcon} width={20} height={20} />
        </IconContainer>
        <IconContainer onDragStart={(e) => e.preventDefault()}>
          <Image alt='' src={SortIcon} width={20} height={20} />
        </IconContainer>
      </div>
    </div>
  );
};

export default Levels;
