import React from 'react';
import { NextPage } from 'next';
import { MainSection } from '@components/Pages/Main';
import dynamic from 'next/dynamic';

const TopPlaysSection = dynamic(
  () => import('@components/Pages/Main/TopPlaysSection'),
  { ssr: false }
);

const RecentLevelsSection = dynamic(
  () => import('@components/Pages/Main/RecentLevelsSection'),
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <div>
      <MainSection />
      <TopPlaysSection />
      <RecentLevelsSection />
    </div>
  );
};

export default Home;
