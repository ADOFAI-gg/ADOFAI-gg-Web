import React from 'react';
import ListIcon from '@assets/icons/list.svg';
import CheckIcon from '@assets/icons/check.svg';
import StatIcon from '@assets/icons/stat.svg';
import Image from 'next/image';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

enum TabType {
  MANAGE_LEVEL,
  RATE_LEVEL,
  STATISTICS
}

const TabItem: React.FC<{
  icon: string;
  label: React.ReactNode;
  active: boolean;
  onSelect: () => void;
}> = ({ label, active, icon, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      style={{
        width: 72,
        height: 72,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      {active && (
        <motion.div
          transition={{ type: 'spring' }}
          layoutId='tab-indicator'
          style={{
            width: 3,
            height: 38,
            background: '#4d93fc',
            position: 'absolute',
            left: 0,
            top: 12,
            borderRadius: '0px 4px 4px 0px'
          }}
        />
      )}
      <Image src={icon} width={26} height={26} alt='' draggable='false' />
      <span style={{ fontSize: 12, fontWeight: 400 }}>{label}</span>
    </div>
  );
};

const AdminSidebar: React.FC = () => {
  const [tab, setTab] = React.useState<TabType>(TabType.MANAGE_LEVEL);

  return (
    <div
      style={{
        height: '100%',
        background: '#00020F',
        width: 72,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <AnimateSharedLayout>
        <TabItem
          onSelect={() => setTab(TabType.MANAGE_LEVEL)}
          icon={ListIcon}
          label='레벨 관리'
          active={tab === TabType.MANAGE_LEVEL}
        />
        <TabItem
          onSelect={() => setTab(TabType.RATE_LEVEL)}
          icon={CheckIcon}
          label='레벨 책정'
          active={tab === TabType.RATE_LEVEL}
        />
        <TabItem
          onSelect={() => setTab(TabType.STATISTICS)}
          icon={StatIcon}
          label='통계'
          active={tab === TabType.STATISTICS}
        />
      </AnimateSharedLayout>
    </div>
  );
};

export default AdminSidebar;
