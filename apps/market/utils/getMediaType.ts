import { MultimediaType } from '@/types/general';

export const getMediaType = (url: string): MultimediaType => {
  const browserSupportedVideoFormats = ['mp4', 'mpeg', 'webm', 'ogg', 'avi', '3gp', 'mpeg', 'mkv'];

  const fileFormat = url.split('.').pop()!.toLocaleLowerCase();

  return browserSupportedVideoFormats.includes(fileFormat) ? MultimediaType.VIDEO : MultimediaType.IMAGE;
};
