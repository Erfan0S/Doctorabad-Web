import Image from "next/image";
import { sidebarMenuData } from "./menu-data";
import { Squircle } from "@repo/shared_modules/icons";
import { useClientComponentInitiated } from "@repo/core/hooks/useClientComponentInitiated";

interface Props {
  isMainLogoActive: boolean;
}
// const squircleColor: { [key: string]: string } = {
//   red: "#F0CCCB",
//   orange: "#FEEBD6",
//   green: "#DAF4CB",
//   blue: "#C7E5F2",
//   purple: "#DCD3F0",
// };

const SidebarNav = ({ isMainLogoActive }: Props) => {
  const pathNmae = window.location.pathname;

  const shouldRender = useClientComponentInitiated();

  // refactor and implement two component for mobile and desktop
  const getSideMenuData = () => {
    if (isMainLogoActive) return sidebarMenuData;

    return sidebarMenuData.map((item, i) => ({
      ...item,
      active: item.basePath ? pathNmae.startsWith(item.basePath) : false,
    }));
  };

  if (!shouldRender) return null;

  return (
    <div className="app-sidebar-nav">
      <ul>
        {getSideMenuData().map(
          ({
            id,
            title,
            subTitle,
            image,
            color,
            href,
            active,
            mobileTitle,
          }) => (
            <li key={id} className={active ? "active" : ""} id={String(id)}>
              <div className="app-sidebar-nav-shape" />
              <a type="button" href={href} className={`app-side-${color}`}>
                {/* <Squircle fill="#fff" />
                <Squircle fill={squircleColor[color]} /> */}

                <Image src={image} alt={title} width={60} height={60} />

                {!active && mobileTitle && <span>{mobileTitle}</span>}
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
