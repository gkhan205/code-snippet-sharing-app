'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { Input } from '@/components/ui/input';
import { formUrlQuery } from '@/lib/utils';

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    applyFilter(value);
  };

  const applyFilter = debounce((value: string) => {
    const url = formUrlQuery({
      params: searchParams.toString(),
      key: 'search',
      value: value,
    });

    router.push(url, { scroll: false });
  }, 300);

  return <Input placeholder='Search snippet...' onChange={handleChange} />;
};
