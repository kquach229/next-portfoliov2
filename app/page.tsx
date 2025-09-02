import Link from 'next/link';
import ThreeJsContainer from '../components/ThreeJsContainer';
import ReusableLink from '@/components/ReusableLink';
import ReusableCard from '@/components/ReusableCard';

export default function Home() {
  return (
    <div id='home' className='relative h-screen w-full overflow-hidden'>
      {/* Background 3D model */}

      <ThreeJsContainer filePath='/animated_ancient_dragon.glb' />

      {/* Overlay Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
        <h1 className='text-4xl md:text-6xl font-bold text-white drop-shadow-lg'>
          Kenny Quach
        </h1>
        <p className='mt-4 text-lg md:text-xl text-gray-200 max-w-lg'>
          Full Stack Engineer crafting immersive, scalable, and user-friendly
          web experiences.
        </p>

        <div className='mt-8'>
          <ReusableLink title='View My Work' path='/about' />
        </div>
      </div>
    </div>
  );
}
