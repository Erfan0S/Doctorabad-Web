
// Type definitions for Main Slider API

/**
 * Provider types enum
 * 1: Education Center Provider (مرکز آموزش)
 * 2: Content Center Provider (مرکز محتوا)
 * 3: Shopping Center Provider (مرکز خرید)
 */
export enum ProviderType {
    EDUCATION = 1,
    CONTENT = 2,
    SHOPPING = 3,
  }
  
  /**
   * Collection types enum
   * 1: Shopping Center Collection (مجموعه مرکز خرید)
   * 2: Content Center Collection (مجموعه مرکز محتوا)
   */
  export enum CollectionType {
    SHOPPING = 1,
    CONTENT = 2,
  }
  
  /**
   * Entity types
   */
  export type EntityType =
    | 'provider'
    | 'collection'
    | 'shop_product'
    | 'course'
    | 'package'
    | 'medicine'
    | 'exam'
    | 'clinic';
  
  /**
   * Main Slider Item Interface
   */
  export interface MainSliderItem {
    id: number;
    title: string;
    picture: string;
    url: string | null;
    entity_id: number | null;
    entity_type: EntityType | null;
    provider_type: ProviderType | null;
    collection_type: CollectionType | null;
  }
  
  /**
   * API Response type
   */
  export interface MainSliderResponse {
    data: MainSliderItem[];
  }
  
