export interface BookContentFile {
  subtitle: string;
  body: string | null;
  file_detail: {
    name: string;
    size: number;
    url: string;
    thumbnail?: string;
  };
}

export interface BookContents {
  id: number;
  title: string;
  book_id: number;
  book_title: string;
  files: BookContentFile[];
}
