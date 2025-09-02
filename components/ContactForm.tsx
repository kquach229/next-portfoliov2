'use client';
import { useState } from 'react';
import ReusableButton from './ReusableButton';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('Message sent!');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('Something went wrong. Try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 max-w-5xl'>
      <div className='text-xl tracking-tighter font-extrabold text-foreground/50'>
        Let&apos;s Work Together
      </div>
      <input
        type='text'
        placeholder='Name'
        className='w-full border border-mysterious-green p-2 rounded focus:outline-none'
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type='email'
        placeholder='Email'
        className='w-full border border-mysterious-green p-2 rounded focus:outline-none'
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <textarea
        placeholder='Message'
        className='w-full border border-mysterious-green p-2 rounded focus:outline-none'
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
      />

      <ReusableButton type='submit' title='Send' />

      {status && <p>{status}</p>}
    </form>
  );
}
