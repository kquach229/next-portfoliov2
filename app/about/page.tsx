import React from 'react';
import motion from 'motion/react';
import ReusableCard from '@/components/ReusableCard';
import { expertiseAndSkills, projects } from '../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import ReusableLink from '@/components/ReusableLink';
import {
  BrainCogIcon,
  Code,
  ComputerIcon,
  GithubIcon,
  LucideLinkedin,
  MapPin,
  ServerIcon,
} from 'lucide-react';

const renderSkillTitleIcon = (title: string) => {
  switch (title) {
    case 'Frontend Dev':
      return <ComputerIcon />;
    case 'Backend Dev':
      return <ServerIcon />;
    case 'Infrastructure & AI':
      return <BrainCogIcon />;
    default:
      return null;
  }
};

const AboutPage = () => {
  return (
    <div className='w-full'>
      <div className='min-h-screen'>
        <div className='flex flex-col-reverse md:flex-row justify-around items-center min-h-screen gap-10'>
          <div className='w-[100%] h-auto md:w-1/2 lg:w-1/5'>
            <Image
              src='/profile.webp'
              priority
              placeholder='blur'
              blurDataURL='/blurred-profile.png'
              alt='image'
              width={500}
              height={500}
              className='rounded-md w-[100%] h-auto object-cover'
            />
          </div>
          <div className='space-y-10 mt-5 md:mt-0 w-[100%] md:w-1/2'>
            <div className='text-6xl font-extrabold'>I'm KENNY QUACH</div>
            <div className='space-y-2'>
              <div className='text-xl'>Fullstack Engineer</div>
              <div className='max-w-[70ch]'>
                I've enjoyed turning designs into fullstack solutions while
                maintaing code quality and performance. Recently, I have been
                diving deep into AI tools.
              </div>
              <ReusableCard>
                <div className='flex flex-col space-y-2'>
                  <span className='inline-flex gap-2'>
                    <MapPin /> Based in NYC Metropolitan Area
                  </span>
                  <span className='inline-flex gap-2'>
                    <Code /> 5+ Years of Experience
                  </span>
                  <span className='inline-flex gap-5'>
                    <Link
                      href='https://www.linkedin.com/in/kennyquach/'
                      target='_blank'>
                      <LucideLinkedin />
                    </Link>
                    <Link href='https://github.com/kquach229' target='_blank'>
                      <GithubIcon />
                    </Link>
                  </span>
                </div>
              </ReusableCard>
              <div className='mt-10'>
                <ReusableLink title='See Projects' path='/about/#expertise' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-20' id='expertise'>
        <div className='text-3xl tracking-tighter mb-5'>Skills & Expertise</div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          {expertiseAndSkills.map((skill) => (
            <div className='border border-mysterious-green space-y-5 p-5'>
              <div>{renderSkillTitleIcon(skill.title)}</div>
              <div className='text-2xl font-extrabold inline-flex text-center'>
                {skill.title}
              </div>
              <div>{skill.description}</div>

              <div>
                {skill.technologies.map((technology) => (
                  <div>{`{${technology}}`}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id='projects' className='mt-20'>
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
                    objectFit='cover'
                    className='w-[100%] h-[300px] object-cover'
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
