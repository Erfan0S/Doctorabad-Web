import { AvatarFile, MultimediaType } from '@/types/general';
import { SingleProductFile } from '@/types/product';
import { getMediaType } from './getMediaType';

export const getAvatarSource = (file: AvatarFile | null) => {
  if (!file) return null;
  return file?.info?.path;
};

export const getAvatarType = (file: SingleProductFile): MultimediaType => {
  return getMediaType(file.url) === 'video' ? MultimediaType.VIDEO : MultimediaType.IMAGE;
};
