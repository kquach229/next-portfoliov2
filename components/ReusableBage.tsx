import React from 'react';

const ReusableBage = ({ title, styles }) => {
  return (
    <div style={styles} className={`bg-mysterious-green rounded-lg p-1`}>
      {title}
    </div>
  );
};

export default ReusableBage;
