export type GetAllSnippetsReturnType = {
  data: SnippetItemType[];
  totalPages: number;
};

export type SnippetItemType = {
  id: string;
  title: string;
  description?: string | null;
  tags?: string[];
  code: string;
  language: string;
  isPublic?: boolean | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  authorId: string;
  author: {
    name: string | null;
  };
};

export type SearchParamsType = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type GetAllSnippetFuncArgs = {
  page: number;
  limit?: number;
  searchText?: string;
  language?: string;
};
