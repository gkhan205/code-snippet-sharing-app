'use client';

import Link from 'next/link';
import dayjs from 'dayjs';

import { SnippetItemType } from '@/common/types';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CalendarDays, Copy, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';

type Props = {
  snippet: SnippetItemType;
  isDetailPage?: boolean;
};

export const SnippetItem = ({ snippet, isDetailPage = false }: Props) => {
  const { user } = useCurrentUser();

  const handleCopyCode = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(snippet.code);
    }
  };

  return (
    <Card key={snippet.id} className='relative'>
      <CardContent className={cn('bg-white pt-6 rounded-md')}>
        <h1 className={cn('text-xl font-bold')}>{snippet.title}</h1>
        <div
          className={cn('text-gray-500 text-xs mt-1 flex items-center gap-2')}>
          <p className='flex gap-2 items-center'>
            <User size={14} /> {snippet.author.name}
          </p>
          <p className='flex gap-2 items-center'>
            <CalendarDays size={14} />{' '}
            {dayjs(snippet.createdAt).format('DD MMM YYYY')}
          </p>
        </div>

        {isDetailPage && (
          <div className='my-3 pt-3 border-t text-gray-500 text-xs flex gap-2 items-center'>
            <p className='capitalize'>{snippet.language}</p>
            <p className='flex gap-2 items-center'>
              {' '}
              <Tag size={14} /> {snippet.tags?.join(', ')}
            </p>
          </div>
        )}

        <p className={cn('my-5')}>{snippet.description}</p>

        {!isDetailPage && (
          <div className='mb-5 text-gray-500 text-xs flex gap-2 items-center'>
            <p className='capitalize'>{snippet.language}</p>
            <p className='flex gap-2 items-center'>
              {' '}
              <Tag size={14} /> {snippet.tags?.join(', ')}
            </p>
          </div>
        )}

        {!isDetailPage && (
          <Link
            href={`/snippet/${snippet.id}`}
            className={cn(
              'text-md bg-green-500 text-white px-5 py-2 rounded-md'
            )}>
            View Snippet
          </Link>
        )}

        {isDetailPage && (
          <div className='absolute right-0 bottom-0 mt-6'>
            <Button variant='ghost' onClick={handleCopyCode}>
              <Copy />
            </Button>
          </div>
        )}

        {user.id === snippet.authorId && (
          <Link
            href={`/snippet/${snippet.id}/edit`}
            className={cn(
              'text-md bg-yellow-500 text-black px-5 py-2 rounded-md',
              {
                'ms-2': !isDetailPage,
              }
            )}>
            Edit Snippet
          </Link>
        )}
      </CardContent>
    </Card>
  );
};
