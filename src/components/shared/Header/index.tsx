'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Header = () => {
  const pathname = usePathname();
  const { user, signOut } = useCurrentUser();

  return (
    <header className='bg-primary text-white p-3 drop-shadow gap-5'>
      <div className='container flex w-full items-center justify-between'>
        <nav className={cn('flex flex-1 items-center gap-5')}>
          <h1>Code Share</h1>

          <ul className={cn('flex items-center gap-5 ms-20')}>
            <li>
              <Link
                href='/feed'
                className={cn({
                  'font-bold': pathname.includes('/feed'),
                  'text-gray-400': !pathname.includes('/feed'),
                })}>
                Feed
              </Link>
            </li>
            <li>
              <Link href='/create-snippet'>Create Snippet</Link>
            </li>
          </ul>
        </nav>
        <div className='flex items-center gap-5'>
          <p>{user?.name}</p>
          <Button variant='secondary' onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};
