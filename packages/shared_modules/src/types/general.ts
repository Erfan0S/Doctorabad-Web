export interface ResponseType<D = any> {
  status: number;
  data: D;
}

export type SelectionItem = {
  id: number;
  title: string;
};
