import { StaticImageData } from "next/image";

// export interface Banner {
//     id: number;
//     image: StaticImageData;
//     title?: string;
//     href?: string;
//     imageWidth?: number;
//     imageHeight?: number
// }

export interface Banner {
  id: number;
  title: string;
  url: string;
  location: number;
  priority: number;
  product_id: number | null;
  product_title: string | null;
  provider_id: null | number;
  category_id: null | number;
  collection_id: null | number;
  pic_url: string;
}
