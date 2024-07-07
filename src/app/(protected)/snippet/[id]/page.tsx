import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { getAllSnippetByIdAction } from '@/common/actions/snippets';
import { SearchParamsType, SnippetItemType } from '@/common/types';
import { SnippetItem } from '@/components/shared/SnippetItem';

export default async function SnippetDetailPage({ params }: SearchParamsType) {
  const snippet: SnippetItemType | null = await getAllSnippetByIdAction(
    params.id
  );

  if (!snippet) {
    return <div>Snippet not found!</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <SnippetItem isDetailPage snippet={snippet} />
      <span className='col-span-2'>
        <SyntaxHighlighter
          showLineNumbers
          language={snippet.language}
          style={atomDark}>
          {snippet.code}
        </SyntaxHighlighter>
      </span>
    </div>
  );
}
