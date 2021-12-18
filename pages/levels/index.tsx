import React from 'react';
import { NextPage } from 'next';
import InputField from '@components/InputField';
import Image from 'next/image';
import SearchIcon from '@assets/icons/search.svg';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import FilterIcon from '@assets/icons/filter.svg';
import SortIcon from '@assets/icons/sort.svg';
import TagIcon from '@assets/icons/tag.svg';
import ResetIcon from '@assets/icons/reset.svg';
import { useForm, UseFormReturn } from 'react-hook-form';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import infoIcon from '@assets/otherIcons/info.svg';

const TabItemContainer = styled.div`
  position: relative;
  cursor: pointer;
  padding: 6px 8px;
  min-width: 69px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  gap: 6px;
  font-size: 16px;
  letter-spacing: -0.031em;
  line-height: 10px;
  font-weight: normal;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  img {
    opacity: 0.8;
  }
`;

type Tag = {
  id: number | string;
  name: string;
  icon?: string;
  default?: boolean;
};

const ChartTags: Tag[] = [
  {
    id: 20,
    name: 'Subjective'
  },
  {
    id: 13,
    name: 'Pseudo'
  },
  {
    id: 15,
    name: 'Pseudo +2'
  },
  {
    id: 14,
    name: 'Gallop'
  },
  {
    id: 8,
    name: 'Magic Shape'
  },
  {
    id: 5,
    name: 'Memorization'
  },
  {
    id: 3,
    name: 'No Speed Change'
  },
  {
    id: 6,
    name: 'No Twirls'
  }
];

const RhythmTags: Tag[] = [
  {
    id: 2,
    name: 'Triplet'
  },
  {
    id: 19,
    name: 'Quintuplet'
  },
  {
    id: 9,
    name: 'Sqptuplet'
  },
  {
    id: 18,
    name: 'Polyrhythm'
  },
  {
    id: 16,
    name: 'Swing'
  },
  {
    id: 21,
    name: 'Tresillo'
  },
  {
    id: 12,
    name: 'Funky Beat'
  },
  {
    id: 10,
    name: '64+ Beat'
  },
  {
    id: 7,
    name: 'Acceleration / Deceleration'
  },
  {
    id: 17,
    name: 'Slow'
  }
];

const LengthTags: Tag[] = [
  {
    id: 'length-short',
    name: 'Short'
  },
  {
    id: 'length-medium',
    name: 'Medium'
  },
  {
    id: 'length-long',
    name: 'Long'
  }
];

type TabItemProps = {
  icon: string;
  active: boolean;
  isResetButton?: boolean;
} & React.HTMLProps<any>;

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
    <div>{children}</div>
  </TabItemContainer>
);

enum SearchSettingTabType {
  NONE,
  TAGS,
  META,
  SORT
}

const TabContentContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const TabContentGroup: React.FC<{ title: React.ReactNode }> = ({
  title,
  children
}) => {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          paddingBottom: 12,
          fontSize: 16,
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          width: '100%'
        }}
      >
        {title}
      </div>
      <div style={{ marginTop: 10 }}>{children}</div>
    </div>
  );
};

const TabCheckboxContent = styled.div`
  display: flex;
  gap: 6px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
`;

const TabCheckboxContainer = styled.label`
  align-items: center;
  cursor: pointer;

  input:checked + ${TabCheckboxContent} {
    opacity: 1;
  }
  input {
    display: none;
  }
`;

const TagCheckbox: React.FC<{
  form: FormType;
  tag: Tag;
  radio?: boolean;
  inputName?: string;
  formKey?: 'tags' | 'length';
  uncheckable?: boolean;
}> = ({
  form,
  tag,
  radio,
  inputName = 'tags',
  formKey = 'tags',
  uncheckable
}) => {
  const getTagIcon = (id: string) => {
    try {
      return (
        <Image
          onDragStart={(e) => e.preventDefault()}
          alt=''
          src={require(`@assets/tagIcons/${id}.svg`).default.src}
          width={22}
          height={22}
        />
      );
    } catch (e) {
      return '';
    }
  };

  const register = form.register(formKey);

  return (
    <TabCheckboxContainer>
      <input
        {...register}
        onClick={() => {
          if (uncheckable && tag.id === form.getValues('length')) {
            form.setValue('length', '');
          }
        }}
        type={radio ? 'radio' : 'checkbox'}
        name={inputName || register.name}
        value={tag.id || ''}
        defaultChecked={tag.default}
      />
      <TabCheckboxContent>
        {getTagIcon(`${tag.id || tag.icon}`)} {tag.name}
      </TabCheckboxContent>
    </TabCheckboxContainer>
  );
};

const TagsTab: React.FC<{ form: FormType }> = ({ form }) => {
  return (
    <TabContentContainer style={{ display: 'flex' }}>
      <TabContentGroup title='Chart Related'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ChartTags.map((x, i) => (
            <TagCheckbox form={form} key={i} tag={x} />
          ))}
        </div>
      </TabContentGroup>
      <TabContentGroup title='Rhythm Related'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {RhythmTags.map((x, i) => (
            <TagCheckbox form={form} key={i} tag={x} />
          ))}
        </div>
      </TabContentGroup>
      <TabContentGroup title='Length'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LengthTags.map((x, i) => (
            <TagCheckbox
              radio
              uncheckable
              formKey='length'
              inputName='length'
              form={form}
              key={i}
              tag={x}
            />
          ))}
        </div>
      </TabContentGroup>
    </TabContentContainer>
  );
};

const MetaTab: React.FC = () => {
  return <div>meta</div>;
};

const SortTab: React.FC = () => {
  return <div>sort</div>;
};

type FormProps = { tags: string[]; query: string; length: string };

type FormType = UseFormReturn<FormProps>;

const Levels: NextPage = () => {
  const { t } = useTranslation('main');
  const [tab, setTab] = React.useState<SearchSettingTabType>(
    SearchSettingTabType.NONE
  );

  const toggleTab = (type: SearchSettingTabType) => () => {
    if (tab === type) {
      setTab(SearchSettingTabType.NONE);
    } else {
      setTab(type);
    }
  };

  const form: FormType = useForm<FormProps>({
    defaultValues: {
      tags: [],
      query: ''
    }
  });

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      console.log(value);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, form]);

  const getCurrentTab = () => {
    switch (tab) {
      case SearchSettingTabType.TAGS:
        return <TagsTab form={form} />;
      case SearchSettingTabType.META:
        return <MetaTab />;
      case SearchSettingTabType.SORT:
        return <SortTab />;
      case SearchSettingTabType.NONE:
        return null;
    }
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Tab') {
        switch (tab) {
          case SearchSettingTabType.TAGS:
            setTab(() => SearchSettingTabType.META);
            break;
          case SearchSettingTabType.META:
            setTab(() => SearchSettingTabType.SORT);
            break;
          case SearchSettingTabType.SORT:
            setTab(() => SearchSettingTabType.TAGS);
            break;
        }
      }
    };

    window.addEventListener('keydown', handler);

    return () => window.removeEventListener('keydown', handler);
  }, [tab, setTab]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ display: 'flex', gap: 8 }}>
          <InputField
            containerProps={{
              style: {
                flexGrow: 1,
                width: 0
              }
            }}
            {...form.register('query')}
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
        </div>
        <AnimateSharedLayout>
          <AnimatePresence>
            <div
              style={{
                marginTop: 6,
                paddingLeft: 12,
                paddingRight: 12,
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
                Tags
              </TabItem>
              <TabItem
                onClick={toggleTab(SearchSettingTabType.META)}
                active={tab === SearchSettingTabType.META}
                icon={FilterIcon.src}
              >
                Meta
              </TabItem>
              <TabItem
                onClick={toggleTab(SearchSettingTabType.SORT)}
                active={tab === SearchSettingTabType.SORT}
                icon={SortIcon.src}
              >
                Sort
              </TabItem>
              <TabItem active={false} icon={ResetIcon.src} isResetButton>
                Reset Search Settings
              </TabItem>
              {tab === SearchSettingTabType.TAGS && (
                <>
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
                    <Image
                      alt=''
                      onDragStart={(e) => e.preventDefault()}
                      src={infoIcon}
                      width={12}
                      height={12}
                    />
                    <div
                      style={{
                        fontSize: 14,
                        letterSpacing: '-0.011em'
                      }}
                    >
                      You can apply filters by clicking tags.
                    </div>
                  </div>
                </>
              )}
            </div>
          </AnimatePresence>
        </AnimateSharedLayout>
        <div
          style={{
            marginTop: 16,
            paddingLeft: 12,
            paddingRight: 12
          }}
        >
          {getCurrentTab()}
        </div>
      </form>
    </div>
  );
};

export default Levels;
