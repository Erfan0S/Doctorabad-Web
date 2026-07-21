import logoType from "../../../assets/img/logo-type.png";
import { Squircle } from "@repo/shared_modules/icons";
import Image from "next/image";
import { baseUrls } from "@repo/core/constants/routePath";

interface Props {
  active?: boolean;
}

const SidebarLogo = ({ active = false }: Props) => {
  return (
    <div className="app-sidebar-logo">
      {active && (
        <>
          <div className="app-sidebar-logo-shape" />
          <Squircle />
        </>
      )}
      <a href={baseUrls.base}>
        <Image
          src={logoType}
          style={{
            width: "75px",
            height: "auto",
          }}
          alt="دکترآباد"
        />
      </a>
    </div>
  );
};
export default SidebarLogo;
