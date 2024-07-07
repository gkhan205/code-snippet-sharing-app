import { getAllSnippetsAction } from '@/common/actions/snippets';
import { SnippetItemType } from '@/common/types';
import { SnippetItem } from '@/components/shared/SnippetItem';
import { cn } from '@/lib/utils';

export default async function FeedPage() {
  const snippets: SnippetItemType[] = await getAllSnippetsAction();

  return (
    <>
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-5'
        )}>
        {snippets.map((snippet: SnippetItemType) => (
          <SnippetItem snippet={snippet} />
        ))}
      </div>
    </>
  );
}
