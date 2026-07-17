import Image from "next/image";
import logo from "@/assets/img/logo.png";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="ms-auto max-md:order-2 max-md:mb-2 max-md:[&_img]:max-h-10 max-md:[&_img]:w-auto max-[400px]:[&_img]:max-h-[30px]">
      <Link className="flex flex-row-reverse items-center text-black" href="/">
        <Image width={180} src={logo} alt="مرکزخرید‌دکترآباد" />
      </Link>
    </div>
  );
};
export default Logo;
