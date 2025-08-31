import React from 'react';
import motion from 'motion/react';
import ReusableCard from '@/components/ReusableCard';
import { projects } from '../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import ReusableLink from '@/components/ReusableLink';

const AboutPage = () => {
  const expertise = [
    { id: 1, title: 'Frontend', technologies: ['React/Next.js', ''] },
    { id: 2, title: 'Backend', technologies: [] },
  ];
  return (
    <div className='w-full'>
      <div className='flex flex-col md:flex-row justify-around items-center min-h-screen'>
        <div className='w-[100%] md:w-1/4'>
          <Image
            src='/profile.webp'
            alt='image'
            width={500}
            height={500}
            className='rounded-md w-[100%] h-auto'
            objectFit='contain'
          />
        </div>
        <div className='space-y-10 mt-20 md:mt-0 w-[100%] md:w-1/2'>
          <div className='text-6xl font-extrabold'>I'm KENNY QUACH</div>
          <div className='space-y-2'>
            <div className='text-xl'>Fullstack Engineer</div>
            <div className='max-w-[70ch]'>
              Since 2018, I've enjoyed turning designs into fullstack solutions
              while maintaing code quality and performance.
            </div>
          </div>
        </div>
      </div>
      <div className='mt-20'>
        <div className='text-3xl tracking-tighter'>Some of My Work</div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
          {projects.map((project) => (
            <ReusableCard key={project.id}>
              <div className='flex flex-col gap-5 justify-between h-full w-full'>
                <div className='rounded-md w-full'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    height={500}
                    width={500}
                    objectFit='contain'
                    className='w-[500px] h-[300px]'
                  />
                </div>

                <div className='flex items-center gap-3'>
                  {project.technologiesUsed?.map((technology) => (
                    <Image
                      key={technology}
                      src={`/${technology}.svg`}
                      width={35}
                      height={35}
                      alt={technology}
                    />
                  ))}
                </div>

                <div className='space-y-5'>
                  <div className='flex justify-between'>
                    <span className='font-bold'>{project.title}</span>
                    <span>{project.date}</span>
                  </div>
                  <div>{project.description}</div>
                </div>

                <ReusableLink
                  title={`Visit ${project.title}`}
                  path={`${project.link}`}
                  openNewTab={true}
                />
              </div>
            </ReusableCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
