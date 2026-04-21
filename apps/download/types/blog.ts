import { StaticImageData } from 'next/image';

export interface BlogType {
  id: number;
  created_at: string;
  title: string;
  excerpt: string;
  link: string;
  pic_url: string;
}
