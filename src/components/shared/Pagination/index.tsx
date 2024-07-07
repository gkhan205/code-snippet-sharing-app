'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { formUrlQuery } from '@/lib/utils';

type Props = {
  page: number;
  totalPage: number;
  urlParamName?: string;
};

export const Pagination = ({
  page,
  totalPage,
  urlParamName = 'page',
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePagination = (type: string) => () => {
    const pageValue = type === 'next' ? page + 1 : page - 1;

    const newUrl = formUrlQuery({
      key: urlParamName,
      value: pageValue.toString(),
      params: searchParams.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className='flex gap-4'>
      <Button disabled={page <= 1} onClick={handlePagination('prev')}>
        Prev
      </Button>
      <Button disabled={page >= totalPage} onClick={handlePagination('next')}>
        Next
      </Button>
    </div>
  );
};
