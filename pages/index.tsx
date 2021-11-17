import React from 'react';
import { NextPage } from 'next';
import { MainSection, RecentLevelsSection } from '@components/Pages/Main';

const Home: NextPage = () => {
  return (
    <div>
      <MainSection />
      <RecentLevelsSection />
    </div>
  );
};

export default Home;
