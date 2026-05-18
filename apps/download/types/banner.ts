// export interface Banner {
//     id: number;
//     image: StaticImageData;
//     title?: string;
//     href?: string;
//     imageWidth?: number;
//     imageHeight?: number
// }

export interface Banner {
  id?: number;
  title?: null | string;
  url: null | string;
  package_id: number | null;
  provider_id: null | number;
  collection_id: null | number;
  picture?: string;
}
