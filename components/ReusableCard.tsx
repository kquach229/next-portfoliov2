import React from 'react';

const ReusableCard = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: React.CSSProperties;
}) => {
  return (
    <div style={styles ?? {}} className='bg-mysterious-green/30 rounded-sm'>
      <div className='p-5 mx-auto'>{children}</div>
    </div>
  );
};

export default ReusableCard;
