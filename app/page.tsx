import Link from 'next/link';
import ThreeJsContainer from '../components/ThreeJsContainer';
import ReusableLink from '@/components/ReusableLink';
import { Suspense } from 'react';
import ReusableCard from '@/components/ReusableCard';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className='overflow-hidden'>
      <ThreeJsContainer filePath={'/mobile_home.glb'} />

      <div className='absolute top-[70%] right-[10%]'>
        <ReusableCard>
          <div className='w-[300px] min-h-[100] mx-auto space-y-5'>
            <div className='text-lg text-center'>Welcome to my Portfolio!</div>

            <div className='mx-auto text-center'>
              <ReusableLink title='Enter my portfolio' path='/workd' />
            </div>
          </div>
        </ReusableCard>
      </div>
    </div>
  );
}
