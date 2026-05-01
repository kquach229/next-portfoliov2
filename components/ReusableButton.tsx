import React from 'react';

type ReusableButtonType = {
  title: string;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
};

const ReusableButton = ({ title, type, onClick, disabled }: ReusableButtonType) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className='bg-foreground text-background p-2 rounded-xs font-bold min-w-[2rem] text-center disabled:opacity-50 disabled:cursor-not-allowed'>
      {title}
    </button>
  );
};

export default ReusableButton;
