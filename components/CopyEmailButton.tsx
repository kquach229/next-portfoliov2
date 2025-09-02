'use client';

import React, { useState } from 'react';

const CopyEmailButton = () => {
  const [message, setMessage] = useState('');
  const handleClickCopyEmail = () => {
    setMessage('Email Copied!');
    navigator.clipboard.writeText('kquach229@gmail.com');

    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className='flex flex-col gap-2 text-center'>
      <button
        className='bg-foreground text-background p-2 rounded-xs font-bold min-w-[2rem] text-center uppercase cursor-pointer'
        type='submit'
        onClick={handleClickCopyEmail}>
        Copy Email
      </button>
      <div className='h-8 text-center w-full'>
        {message && <div className='text-center mx-auto w-full'>{message}</div>}
      </div>
    </div>
  );
};

export default CopyEmailButton;
