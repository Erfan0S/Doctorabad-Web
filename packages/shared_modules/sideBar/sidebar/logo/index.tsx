import style from "../Sidebar.module.scss";
import logoType from "../../../assets/img/logo-type.png";
import { Squircle } from "@repo/shared_modules/icons";
import Image from "next/image";
import Link from "next/link";
import { baseUrls } from "@repo/core/constants/routePath";

interface Props {
  active?: boolean;
}

const SidebarLogo = ({ active = false }: Props) => {
  return (
    <div className={style.sidebarLogo}>
      {active && (
        <>
          <div className={style.sidebarLogoShape} />
          <Squircle />
        </>
      )}
      <a href={baseUrls.base}>
        <Image src={logoType} width={140} height={140} alt="دکترآباد" />
      </a>
    </div>
  );
};
export default SidebarLogo;
