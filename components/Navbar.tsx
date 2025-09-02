'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollSpy } from './ScrollSpyPrivider';

const links = [
  { id: 1, title: 'home', link: '/' },
  { id: 2, title: 'about', link: '/about#intro' },
  { id: 3, title: 'expertise', link: '/about#expertise' },
  { id: 4, title: 'projects', link: '/about#projects' },
  { id: 5, title: 'experience', link: '/about#experience' },
  { id: 6, title: 'contact', link: '/about#contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const { activeSection } = useScrollSpy();

  if (pathname == '/') return null;

  return (
    <div className='p-5 bg-background w-[100vw] '>
      <div className='flex items-center justify-between z-50'>
        <Image src={'/kq-logo.png'} width={80} height={80} alt='logo' />
        <div className='space-x-5 flex'>
          {links.map((link) => {
            const [base, hash] = link.link.split('#');
            const isActive =
              pathname === base &&
              (hash ? activeSection === hash : activeSection === '');

            return (
              <Link
                key={link.id}
                className={`text-right relative h-[1rem] ${
                  isActive ? 'text-mysterious-green font-extrabold' : ''
                }`}
                href={link.link}>
                <div className='text-xs'>0{link.id}</div>
                <span className=''>{`{${link.title}}`}</span>
              </Link>
            );
          })}
        </div>
        <div className='' />
      </div>
    </div>
  );
};

export default Navbar;
