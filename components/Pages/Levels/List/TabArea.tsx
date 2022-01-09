import React from 'react';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import FilterIcon from '@assets/icons/filter.svg';
import SortIcon from '@assets/icons/sort.svg';
import TagIcon from '@assets/icons/tag.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import ResetIcon from '@assets/icons/reset.svg';
import infoIcon from '@assets/icons/info.svg';
import type { FormType } from '../../../../pages/levels';

export enum SearchSettingTabType {
  NONE,
  TAGS,
  META,
  SORT
}

const TabItemContainer = styled.div`
  position: relative;
  cursor: pointer;
  padding: 6px 8px;
  min-width: 69px;
  opacity: 0.8;
  display: flex;
  gap: 6px;
  font-size: 16px;
  letter-spacing: -0.031em;
  line-height: 10px;
  font-weight: normal;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
  transition-property: background-color, opacity;

  &:hover {
    opacity: 1;
  }
`;

type TabItemProps = {
  icon: string;
  active: boolean;
  isResetButton?: boolean;
} & React.HTMLProps<any>;

const TabGroup = styled.div`
  margin-top: 6px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 426px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

const TabItem: React.FC<TabItemProps> = ({
  icon,
  active,
  isResetButton = false,
  children,
  onClick
}) => (
  <TabItemContainer onClick={onClick} onDragStart={(e) => e.preventDefault()}>
    <AnimatePresence>
      {(active || isResetButton) && (
        <motion.div
          key='tab-bg'
          layoutId={isResetButton ? undefined : 'tab-item'}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: isResetButton ? undefined : 'rgba(2565, 255, 255, 0.2)',
            border: isResetButton
              ? '1.5px solid rgba(255, 255, 255, 0.4)'
              : undefined,
            borderRadius: 5
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 }
          }}
          initial='hidden'
          animate='show'
          exit='hidden'
        />
      )}
    </AnimatePresence>
    <Image src={icon} width={11} height={11} alt='' />
    <div style={{ lineHeight: 1 }}>{children}</div>
  </TabItemContainer>
);

const LevelListTabArea: React.FC<{
  toggleTab: (tab: SearchSettingTabType) => () => void;
  tab: SearchSettingTabType;
  form: FormType;
}> = ({ toggleTab, tab, form }) => {
  const { t } = useTranslation(['search']);
  return (
    <div>
      <AnimateSharedLayout>
        <AnimatePresence>
          <TabGroup>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
            >
              <TabItem
                onClick={toggleTab(SearchSettingTabType.TAGS)}
                active={tab === SearchSettingTabType.TAGS}
                icon={TagIcon.src}
              >
                {t('search:tabs.tags.title')}
              </TabItem>
              <TabItem
                onClick={toggleTab(SearchSettingTabType.META)}
                active={tab === SearchSettingTabType.META}
                icon={FilterIcon.src}
              >
                {t('search:tabs.meta.title')}
              </TabItem>
              <TabItem
                onClick={toggleTab(SearchSettingTabType.SORT)}
                active={tab === SearchSettingTabType.SORT}
                icon={SortIcon.src}
              >
                {t('search:tabs.sort.title')}
              </TabItem>
            </div>

            <TabItem
              active={false}
              icon={ResetIcon.src}
              isResetButton
              onClick={() => {
                form.reset();
              }}
            >
              {t('search:reset')}
            </TabItem>

            <AnimatePresence>
              {tab === SearchSettingTabType.TAGS && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    type: 'tween'
                  }}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    width: 0,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div
                    style={{
                      height: 2,
                      width: 9,
                      background: 'rgba(255,255,255,0.4)',
                      borderRadius: 1.5
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      opacity: 0.6
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        backgroundImage: `url(${infoIcon.src})`
                      }}
                    />
                    {t('search:help.tags')}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabGroup>
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};

export default LevelListTabArea;
