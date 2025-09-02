import React from 'react';

interface IReusableBadge {
  title: string;
  styles?: React.CSSProperties;
}

const ReusableBage = ({ title, styles }: IReusableBadge) => {
  return (
    <div style={styles} className={`bg-mysterious-green rounded-lg p-1`}>
      {title}
    </div>
  );
};

export default ReusableBage;
