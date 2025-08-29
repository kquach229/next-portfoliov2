import Link from 'next/link';
import React from 'react';

const ReusableLink = ({
  path,
  title,
  styles,
}: {
  path: string;
  title: string;
  styles?: React.CSSProperties;
}) => {
  return (
    <Link
      style={styles ?? {}}
      className='bg-foreground text-background p-2 rounded-xs font-bold min-w-[2rem]'
      href={path}>
      {title.toUpperCase()}
    </Link>
  );
};

export default ReusableLink;
