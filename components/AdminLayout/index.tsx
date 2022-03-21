import React from 'react';
import Navbar from '@components/Layout/Navbar';
import AdminSidebar from '@components/AdminLayout/Sidebar';

const AdminLayout: React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          paddingTop: 'var(--header-height)',
          display: 'flex',
          height: '100vh'
        }}
      >
        <AdminSidebar />
        <div style={{ height: '100%', padding: '32px 48px' }}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
