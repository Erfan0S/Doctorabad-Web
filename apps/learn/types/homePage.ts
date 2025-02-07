export interface ProviderType {
  id: number;
  name: string;
  pic_url: string;
}

export type CategoryType = {
  id: number;
  title: string;
  pic_url: string;
};

export type SliderType = {
  id: number;
  title?: string;
  url: string;
  location: number;
  priority?: number;
  course_id?: number;
  provider_id?: number;
  category_id?: number;
  pic_url: string;
};
