'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LanguageSelector } from '../LanguageSelector';
import { formUrlQuery } from '@/lib/utils';

export const LanguageFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  useEffect(() => {
    const language = searchParams.get('language') || '';
    setSelectedLanguage(language);
  });

  const handleChange = (value: string) => {
    setSelectedLanguage(value);

    const url = formUrlQuery({
      params: searchParams.toString(),
      key: 'language',
      value,
    });

    router.push(url, { scroll: false });
  };

  return <LanguageSelector value={selectedLanguage} onChange={handleChange} />;
};
