'use client';

import { z } from 'zod';
import { useParams } from 'next/navigation';

import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import {
  CreateSnippetType,
  editSnippetAction,
  getAllSnippetByIdAction,
} from '@/common/actions/snippets';
import { SnippetForm } from '@/components/shared/SnippetForm';
import { createSnippetFormSchema } from '@/components/shared/SnippetForm/_form-schema';
import { useCallback, useEffect, useState } from 'react';
import { SnippetItemType } from '@/common/types';
import { useToast } from '@/components/ui/use-toast';

export default function EditSnippetPage() {
  const { id } = useParams();
  const { user } = useCurrentUser();
  const { toast } = useToast();

  const snippetId = id as string;

  const [data, setData] = useState<SnippetItemType | null>(null);

  const getData = useCallback(async () => {
    const snippet: SnippetItemType | null = await getAllSnippetByIdAction(
      snippetId
    );

    setData(snippet);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onSubmit = async (values: z.infer<typeof createSnippetFormSchema>) => {
    try {
      const body: CreateSnippetType = {
        ...values,
        authorId: user.id,
        tags: values.tags
          ? values?.tags.split(',').map((t: string) => t.trim())
          : [],
      };

      await editSnippetAction(snippetId, body);
      toast({
        title: 'Success',
        description: 'Snippet is updated!',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className='text-2xl font-bold mb-5'>Edit Snippet</h1>

      <SnippetForm isNew={false} values={data} onSubmit={onSubmit} />
    </>
  );
}
