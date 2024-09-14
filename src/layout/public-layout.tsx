import Header from '@/components/custom/header/header';
import React from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className='mt-16'>{children}</div>
    </>
  );
};

export default PublicLayout;
