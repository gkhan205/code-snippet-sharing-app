'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { removeKeysFromQuery } from '@/lib/utils';

export const ClearFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClear = () => {
    const url = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ['search', 'language'],
    });

    router.push(url, { scroll: false });
  };

  return <Button onClick={handleClear}>Clear</Button>;
};
