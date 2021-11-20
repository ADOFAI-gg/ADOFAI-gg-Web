import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

const Discord: NextPage = () => {
  return <div />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: 'https://discord.gg/TKdpbUUfUa',
      statusCode: 302
    }
  };
};

export default Discord;
