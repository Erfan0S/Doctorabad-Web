import React from "react";
import Image from "next/image";

import logo from "@/assets/img/logo-without-text.png";
import uoloadIcon from "@/assets/svg/uplaod";
import addIcon from "@/assets/svg/add";
import arrow from "@/assets/svg/svg-images/installArrowDown.svg";
import Link from "next/link";
import addMultipleIcon from "@/assets/svg/addmultiple";

interface StepsType {
  text: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const STEPS: StepsType[] = [
  {
    text: "در نوار پایین رو کمه Share بزنید.",
    icon: uoloadIcon,
  },
  {
    text: "در منوی باز شده در قسمت پایین Add to Home Screen را بزنید.",
    icon: addIcon,
  },
  {
    text: "در مرحله بعد در قسمت بالا روی Add بزنید.",
    icon: addMultipleIcon,
  },
];

const WebAppGuide = () => {
  return (
    <div className="flex w-[475px] flex-col items-center justify-center max-[576px]:h-screen max-[576px]:w-screen max-[576px]:bg-white max-[576px]:px-[30px]">
      <div className="flex w-full flex-col items-center justify-center rounded-[22px] border-2 border-solid border-[#e1e8f0] bg-[#f9fafc] px-5 py-10">
        <Image
          src={logo}
          alt="doctorabad logo"
          className="h-auto w-20"
        />
        <h3 className="mt-[15px] text-[20px]">نصب نسخه وب اپلیکیشن</h3>
        <div className="mt-10 flex w-full flex-col justify-start">
          {STEPS.map((step, index) => (
            <div key={index} className="mt-3 flex w-full items-center first:mt-0">
              <div className="ml-5 flex h-10 w-10 items-center justify-center rounded-[5px] bg-[#dcfce7] text-green-base [&_svg]:h-[30px] [&_svg]:w-[30px]">
                <step.icon />
              </div>
              <span className="text-sm font-semibold">{step.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Link href={"/"} className="mt-[10px] w-full cursor-pointer rounded-[15px] border-2 border-solid border-[#e1e8f0] bg-white text-center text-[20px] font-bold leading-[50px] text-green-base transition duration-[250ms] hover:bg-green-base hover:text-white">
        متوجه شدم
      </Link>
    </div>
  );
};

export default WebAppGuide;
