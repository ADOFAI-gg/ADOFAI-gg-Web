import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

const StatsTable = styled.table`
  width: 100%;

  th,
  td {
    font-size: 18px;
  }

  th {
    text-align: right;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0.6;
  }
  td {
    text-align: left;
    padding-left: 20px;
    font-weight: 400;
  }
`;

const LargeCard: React.FC = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 27,
        padding: 26
      }}
    >
      <div style={{ fontSize: 36, textAlign: 'center', fontWeight: 500 }}>
        #1
      </div>
      <div
        style={{
          marginTop: 28,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={184}
          height={184}
          src='https://via.placeholder.com/1024'
          style={{ borderRadius: 184 / 2 }}
          alt=''
        />
        <div
          style={{
            marginTop: 32,
            textAlign: 'center',
            fontSize: 36,
            fontWeight: 700
          }}
        >
          KimchiLover
        </div>
        <StatsTable>
          <colgroup>
            <col span={1} style={{ width: '50%' }} />
            <col span={1} style={{ width: '50%' }} />
          </colgroup>
          <tbody>
            <tr>
              <th>Country</th>
              <td>Sans</td>
            </tr>
            <tr>
              <th>Total PP</th>
              <td>0</td>
            </tr>
            <tr>
              <th>ADOFAI Playtime</th>
              <td>0 Hr</td>
            </tr>
            <tr>
              <th>Achievements</th>
              <td>0</td>
            </tr>
          </tbody>
        </StatsTable>
      </div>
    </div>
  );
};

const Ranking: NextPage = () => {
  return (
    <div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
          paddingBottom: 12,
          marginBottom: 24
        }}
      >
        Rankings
      </div>
      <div style={{ display: 'flex', gap: 50 }}>
        <LargeCard />
        <LargeCard />
        <LargeCard />
      </div>
    </div>
  );
};

export default Ranking;
