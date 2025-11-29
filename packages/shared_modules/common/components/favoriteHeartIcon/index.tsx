import { HeartFillIcon, HeartIcon } from "../../../assets";
import { Apps } from "@repo/core/types/general";
import styles from "./style.module.scss";
import Loading from "../loading";

type Props = {
  isFavorite: boolean;
  app?: Apps;
  loading?: boolean;
  size?: number;
} & React.SVGProps<SVGSVGElement>;

function FavoriteHeartIcon({
  isFavorite,
  app = Apps.BASE,
  loading,
  size,
  ...svgAttribute
}: Props) {
  return loading ? (
    <Loading size={size} app={app} />
  ) : isFavorite ? (
    <HeartFillIcon
      className={`${styles.favoriteFillIcon} ${app}`}
      {...svgAttribute}
    />
  ) : (
    <HeartIcon className={`${app}`} {...svgAttribute} />
  );
}

export default FavoriteHeartIcon;
