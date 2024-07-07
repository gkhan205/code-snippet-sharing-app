import { getAllSnippetsAction } from '@/common/actions/snippets';
import {
  GetAllSnippetsReturnType,
  SearchParamsType,
  SnippetItemType,
} from '@/common/types';
import { Pagination } from '@/components/shared/Pagination';
import { SnippetItem } from '@/components/shared/SnippetItem';
import { cn } from '@/lib/utils';

export default async function FeedPage({ searchParams }: SearchParamsType) {
  const page = Number(searchParams?.page) || 1;

  const snippets: GetAllSnippetsReturnType = await getAllSnippetsAction({
    page,
  });

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'
        )}>
        {snippets.data.map((snippet: SnippetItemType) => (
          <SnippetItem snippet={snippet} />
        ))}
      </div>

      <Pagination page={page} totalPage={snippets.totalPages} />
    </>
  );
}
