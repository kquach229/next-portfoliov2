import React from 'react';

type ReusableButtonType = {
  title: string;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
};

const ReusableButton = ({ title, type, onClick }: ReusableButtonType) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className='bg-foreground text-background p-2 rounded-xs font-bold min-w-[2rem] text-center'>
      {title}
    </button>
  );
};

export default ReusableButton;
