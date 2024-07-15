'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CodeEditor } from '@/components/shared/CodeEditor';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SnippetItemType } from '@/common/types';

import { createSnippetFormSchema } from './_form-schema';
import { useEffect } from 'react';

type Props = {
  isNew: boolean;
  values?: SnippetItemType | null;
  onSubmit: (values: z.infer<typeof createSnippetFormSchema>) => void;
};

export const SnippetForm = ({ isNew, values, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof createSnippetFormSchema>>({
    resolver: zodResolver(createSnippetFormSchema),
    defaultValues: {
      language: 'javascript',
    },
  });

  const setData = () => {
    const tags = (values?.tags || []).join(',');

    form.setValue('code', values?.code || '');
    form.setValue('description', values?.description || '');
    form.setValue('title', values?.title || '');
    form.setValue('language', values?.language || '');
    form.setValue('tags', tags);
  };

  useEffect(() => {
    if (!isNew && !!values) {
      setData();
    }
  }, [isNew, values]);

  const handleSubmit = (values: z.infer<typeof createSnippetFormSchema>) => {
    onSubmit(values);

    if (isNew) {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='grid md:grid-cols-3 grid-cols-1 gap-5'>
        <div className='col-span-2 order-last md:order-first'>
          <FormField
            name='code'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CodeEditor
                    language={form.getValues('language')}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name='language'
            control={form.control}
            render={({ field }) => (
              <FormItem className={cn('mb-3')}>
                <FormLabel className='block'>Language</FormLabel>
                <FormControl>
                  <LanguageSelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='title'
            control={form.control}
            render={({ field }) => (
              <FormItem className={cn('mb-3')}>
                <FormLabel className='block'>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem className={cn('mb-3')}>
                <FormLabel className='block'>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='tags'
            control={form.control}
            render={({ field }) => (
              <FormItem className={cn('mb-3')}>
                <FormLabel className='block'>Tags</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Separate tags with a comma (,)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center justify-between mt-10 gap-4'>
            <Button className='w-2/3' type='submit'>
              Save
            </Button>
            <Button
              className='w-1/3'
              variant='destructive'
              onClick={() => form.reset()}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
