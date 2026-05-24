import Image from "next/image";
import logo from "../../../assets/img/logo-doctor-abad.png";
import style from "./Logo.module.scss";
import Link from "next/link";

const Logo = () => {
  return (
    <div className={style.logo}>
      <Link href="/">
        <Image width={147} height={40} src={logo} alt="مرکزخرید‌دکترآباد" />
      </Link>
    </div>
  );
};
export default Logo;
