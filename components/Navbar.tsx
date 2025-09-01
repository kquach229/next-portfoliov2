'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
  { id: 1, title: 'home', link: '/' },
  { id: 2, title: 'about', link: '/about' },
  { id: 3, title: 'expertise', link: '/expertise' },
  { id: 4, title: 'projects', link: '/about/#projects' },
  { id: 5, title: 'experience', link: '/experience' },
  { id: 6, title: 'contact', link: '/contact' },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className='p-5'>
      <div className='flex items-center justify-between'>
        <Image src={'/kq-logo.png'} width={80} height={80} alt='logo' />
        <div className='space-x-5 flex'>
          {links.map((link) => (
            <Link
              key={link.id}
              className={`text-right relative h-[1rem] ${
                pathname === link.link
                  ? 'text-mysterious-green font-extrabold'
                  : null
              }`}
              href={link.link}>
              <div className='text-xs'>0{link.id}</div>
              <span className=''>{`{${link.title}}`}</span>
            </Link>
          ))}
        </div>
        <div className='' />
      </div>
    </div>
  );
};

export default Navbar;
