import Image from "next/image";
import logo from "../../../assets/img/logo.png";
import Link from "next/link";
import { baseUrls } from "@repo/core/constants/routePath";

const Logo = () => {
  return (
    <div className="order-1 mb-1">
      <Link
        href={baseUrls.base}
        className="flex flex-row-reverse items-center text-black"
      >
        <Image
          width={147}
          height={40}
          src={logo}
          alt="مرکزخرید‌دکترآباد"
          className="max-h-[40px] w-auto max-[400px]:max-h-[30px]"
        />
      </Link>
    </div>
  );
};
export default Logo;
