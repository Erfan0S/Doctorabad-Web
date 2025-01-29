import { AvatarFile, MultimediaType } from "@repo/core/types";
import { SingleProductFile } from "@repo/core/types";
import { getMediaType } from "./getMediaType";

export const getAvatarSource = (file: AvatarFile | null) => {
  if (!file) return null;
  return file?.info?.path;
};

export const getAvatarType = (file: SingleProductFile): MultimediaType => {
  return getMediaType(file.url) === "video"
    ? MultimediaType.VIDEO
    : MultimediaType.IMAGE;
};
