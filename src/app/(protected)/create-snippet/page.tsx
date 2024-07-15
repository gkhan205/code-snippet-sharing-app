'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import {
  CreateSnippetType,
  createSnippetAction,
} from '@/common/actions/snippets';
import { SnippetForm } from '@/components/shared/SnippetForm';
import { createSnippetFormSchema } from '@/components/shared/SnippetForm/_form-schema';

export default function CreateSnippetPage() {
  const router = useRouter();

  const { user } = useCurrentUser();

  const onSubmit = async (values: z.infer<typeof createSnippetFormSchema>) => {
    try {
      const body: CreateSnippetType = {
        ...values,
        authorId: user.id,
        tags: values.tags
          ? values?.tags.split(',').map((t: string) => t.trim())
          : [],
      };

      await createSnippetAction(body);
      router.push('/feed');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className='text-2xl font-bold mb-5'>Create Snippet</h1>

      <SnippetForm isNew onSubmit={onSubmit} />
    </>
  );
}
