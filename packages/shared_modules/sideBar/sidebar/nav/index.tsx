import Image from "next/image";
import style from "../Sidebar.module.scss";
import { mobileMenuLogoSchema, sidebarMenuData } from "./menu-data";
import { Squircle } from "@repo/shared_modules/icons";
import { useMediaQuery } from "@repo/core/hooks/useMediaQuery";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";

interface Props {
  isMainLogoActive: boolean;
}
const squircleColor: { [key: string]: string } = {
  red: "#F0CCCB",
  orange: "#FEEBD6",
  green: "#DAF4CB",
  blue: "#C7E5F2",
  purple: "#DCD3F0",
};

const SidebarNav = ({ isMainLogoActive }: Props) => {
  const href = window.location.href;
  const pathNmae = window.location.pathname;

  const isMobile = useMediaQuery("max-width:768px");
  const shouldRender = useClientComponentInitiated();

  // refactor and implement two component for mobile and desktop
  const getSideMenuData = () => {
    if (!isMobile) {
      return sidebarMenuData.map((item) => ({
        ...item,
        disabled: !href.startsWith(item.href),
      }));
    }
    if (isMainLogoActive)
      return sidebarMenuData.map((e, i) =>
        i === 2 ? mobileMenuLogoSchema : e
      );

    const activeMenuIndex = sidebarMenuData.findIndex((item) =>
      pathNmae.startsWith(item.basePath)
    );

    return sidebarMenuData.map((item, i) =>
      i === 4
        ? { ...mobileMenuLogoSchema, disabled: true }
        : { ...item, disabled: activeMenuIndex !== i }
    );
  };

  if (!shouldRender) return null;

  return (
    <div className={style.sidebarNav}>
      <ul>
        {getSideMenuData().map(
          ({
            id,
            title,
            subTitle,
            image,
            color,
            href,
            disabled,
            mobileTitle,
          }) => (
            <li
              key={id}
              className={!disabled ? style.active : ""}
              id={String(id)}
            >
              <div className={style.sidebarNavShape} />
              <a type="button" href={href} className={style[color]}>
                <Squircle fill="#fff" />
                <Squircle fill={squircleColor[color]} />

                <Image src={image} alt={title} width={46} height={46} />

                {!disabled && mobileTitle && <span>{mobileTitle}</span>}
                <div>
                  <span>{title}</span>
                  <small>{subTitle}</small>
                </div>
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SidebarNav;
