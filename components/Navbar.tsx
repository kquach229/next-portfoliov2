'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScrollSpy } from './ScrollSpyPrivider';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [open, setOpen] = useState(false);

  if (pathname === '/') return null;

  return (
    <nav className='p-5 bg-background w-full fixed top-0 left-0 z-50 shadow-sm'>
      <div className='flex items-center justify-between'>
        <Image src='/kq-logo.png' width={60} height={60} alt='logo' />

        {/* Desktop links */}
        <div className='hidden md:flex space-x-6'>
          {links.map((link) => {
            const [base, hash] = link.link.split('#');
            const isActive =
              pathname === base &&
              (hash ? activeSection === hash : activeSection === '');

            return (
              <Link
                key={link.id}
                className={`relative text-sm transition-colors ${
                  isActive
                    ? 'text-mysterious-green font-extrabold'
                    : 'text-foreground hover:text-mysterious-green'
                }`}
                href={link.link}>
                <span className='block text-xs'>0{link.id}</span>
                <span>{`{${link.title}}`}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          className='md:hidden p-2 rounded focus:outline-none hover:cursor-pointer'
          onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className='md:hidden mt-4 flex flex-col space-y-4'>
          {links.map((link) => {
            const [base, hash] = link.link.split('#');
            const isActive =
              pathname === base &&
              (hash ? activeSection === hash : activeSection === '');

            return (
              <Link
                key={link.id}
                href={link.link}
                className={`text-base ${
                  isActive
                    ? 'text-mysterious-green font-extrabold'
                    : 'text-foreground hover:text-mysterious-green'
                }`}
                onClick={() => setOpen(false)} // close menu on click
              >
                {`{${link.title}}`}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
