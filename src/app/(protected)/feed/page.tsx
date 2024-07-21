import { getAllSnippetsAction } from '@/common/actions/snippets';
import {
  GetAllSnippetsReturnType,
  SearchParamsType,
  SnippetItemType,
} from '@/common/types';
import { ClearFilter } from '@/components/shared/ClearFilter';
import { LanguageFilter } from '@/components/shared/LanguageFilter';
import { Pagination } from '@/components/shared/Pagination';
import { SearchInput } from '@/components/shared/SeachInput';
import { SnippetItem } from '@/components/shared/SnippetItem';
import { cn } from '@/lib/utils';

export default async function FeedPage({ searchParams }: SearchParamsType) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.search as string) || '';
  const language = (searchParams?.language as string) || '';

  const snippets: GetAllSnippetsReturnType = await getAllSnippetsAction({
    page,
    searchText,
    language,
    limit: 9,
  });

  return (
    <>
      <div className='flex items-center gap-5'>
        <SearchInput />
        <LanguageFilter />
        <ClearFilter />
      </div>

      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'
        )}>
        {snippets.data.map((snippet: SnippetItemType) => (
          <SnippetItem key={snippet.id} snippet={snippet} />
        ))}
      </div>

      <Pagination page={page} totalPage={snippets.totalPages} />
    </>
  );
}
