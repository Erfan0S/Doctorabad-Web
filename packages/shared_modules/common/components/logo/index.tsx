import Image from "next/image";
import logo from "../../../assets/img/logo.png";
import style from "./Logo.module.scss";
import Link from "next/link";
import { baseUrls } from "@repo/core/constants/routePath";

const Logo = () => {
  return (
    <div className={style.logo}>
      <Link href={baseUrls.base} >
        <Image width={147} height={40} src={logo} alt="مرکزخرید‌دکترآباد" />
      </Link>
    </div>
  );
};
export default Logo;
