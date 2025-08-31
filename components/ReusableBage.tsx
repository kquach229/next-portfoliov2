import React from 'react';

const ReusableBage = ({ title, styles }) => {
  return (
    <div style={{ styles }} className={`bg-mysterious-green p-5`}>
      {title}
    </div>
  );
};

export default ReusableBage;
