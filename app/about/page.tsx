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
      <div className='flex flex-col justify-center items-center space-y-5 min-h-screen'>
        <div className='text-6xl font-extrabold'>KENNY QUACH</div>
        <span>Fullstack Engineer</span>
        <span className='max-w-[80ch] text-center'>
          Since 2018, I've enjoyed turning designs into fullstack solutions
          while maintaing code quality and performance.
        </span>
      </div>
      <div>
        <div className='text-3xl tracking-tighter'>Some of My Work</div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
          {projects.map((project) => (
            <ReusableCard
              key={project.id}
              styles={{ minHeight: '18rem', minWidth: '18rem' }}>
              <div className='flex flex-col gap-5'>
                <Image
                  src={project.image}
                  alt={project.title}
                  height={800}
                  width={300}
                />

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
