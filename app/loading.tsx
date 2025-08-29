import React from 'react';
import { ClipLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className='space-y-2 text-center'>
      <div>
        <ClipLoader
          loading={true}
          color='#345535'
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
      <div className='text-xl'>Loading...</div>
    </div>
  );
};

export default Loading;
