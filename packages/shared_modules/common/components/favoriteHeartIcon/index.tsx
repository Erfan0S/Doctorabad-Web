import { HeartFillIcon, HeartIcon } from "../../../assets";
import { Apps } from "@repo/core/types/general";
import Loading from "../loading";

type Props = {
  isFavorite: boolean;
  app?: Apps;
  loading?: boolean;
  size?: number;
  icon?: React.ReactNode;
  filledIcon?: React.ReactNode;
} & React.SVGProps<SVGSVGElement>;

function FavoriteHeartIcon({
  isFavorite,
  app = Apps.BASE,
  loading,
  size,
  icon,
  filledIcon,
  ...svgAttribute
}: Props) {
  return loading ? (
    <Loading size={size} app={app} />
  ) : isFavorite ? (
    filledIcon ? (
      <div className={`!fill-app-base !text-app-base ${app}`}>{filledIcon}</div>
    ) : (
      <HeartFillIcon
        className={`!fill-app-base !text-app-base ${app}`}
        width={size}
        height={size}
        {...svgAttribute}
      />
    )
  ) : icon ? (
    <div className={`${app}`}>{icon}</div>
  ) : (
    <HeartIcon
      className={`${app}`}
      width={size}
      height={size}
      {...svgAttribute}
    />
  );
}

export default FavoriteHeartIcon;
