import Link from 'next/link';
import React from 'react';

const ReusableLink = ({
  path,
  title,
  styles,
  openNewTab,
  download,
}: {
  path: string;
  title: string;
  styles?: React.CSSProperties;
  openNewTab?: boolean;
  download?: boolean;
}) => {
  return (
    <Link
      target={openNewTab ? '_blank' : '_self'}
      download={download}
      style={styles ?? {}}
      className='bg-foreground text-background p-2 rounded-xs font-bold min-w-[2rem] text-center'
      href={path}>
      {title.toUpperCase()}
    </Link>
  );
};

export default ReusableLink;
