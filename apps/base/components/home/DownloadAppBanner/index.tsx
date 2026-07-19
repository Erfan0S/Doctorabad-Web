import React from "react";
import DoctorAbadQrCode from "@repo/shared_modules/images/DoctorAbadQrCode.png";
import DoctorAbadLogoText from "@repo/shared_modules/images/DoctorAbadLogoText.png";
import DrAbadMobile from "../../../assets/img/bigBanner/people/KadKhoda-Mobile.png";
import Image from "next/image";
import LeftArrow from "@/assets/svg/leftArrow";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
import Link from "next/link";
const DownloadAppBanner = () => {
  return (
    <section className="container">
      <div className="mt-[50px] box-border flex h-[400px] w-full flex-row-reverse items-center justify-between gap-6 rounded-[32px] border-2 border-solid border-[#e6e6e6] bg-white py-[10px] px-[50px] [direction:rtl] max-[1100px]:h-auto max-[1100px]:flex-col max-[1100px]:p-4 max-[480px]:gap-3 max-[480px]:p-3">
        <div className="flex h-full w-[40%] justify-center max-[1100px]:max-w-[180px] max-[480px]:w-full max-[480px]:max-w-[220px]">
          <DiviceSwitchShell
            desktop={
              <Image
                src={DrAbadMobile}
                alt="Doctor Abad"
                className="h-full w-auto max-[1100px]:hidden"
              />
            }
            mobile={null}
          />
        </div>
        <div className="flex min-w-0 flex-row items-start justify-between gap-[120px] max-[1100px]:mt-3 max-[1100px]:w-full max-[480px]:flex-col max-[480px]:items-center max-[480px]:gap-3">
          <div className="flex w-[200px] flex-col items-center gap-[14px] rounded-[16px] border-2 border-solid border-[#e6e6e6] p-[18px]">
            <Image
              src={DoctorAbadQrCode}
              alt="QR Code"
              className="h-[140px] w-[140px] rounded-[8px] object-contain"
            />
            <div className="text-[16px] font-bold text-[#333]">برای دانلود اسکن کنید!</div>
          </div>
          <div className="flex min-w-0 flex-col items-start justify-center text-right">
            <div className="flex flex-col">
              <div className="mb-[6px] text-[26px] font-bold text-[#111] max-[480px]:text-[20px]">
                اپلیکیشن{" "}
                <span>
                  <Image
                    src={DoctorAbadLogoText}
                    alt="دکترآباد"
                    className="h-auto w-[100px]"
                  />
                </span>
              </div>
              <div className="text-[20px] font-semibold text-black">
                کاربری راحت‌تر و کسب امتیاز بیشتر
              </div>
            </div>
            <Link
              href="/app"
              className="mt-9 flex cursor-pointer items-center gap-[3px] text-[16px] font-semibold text-[#49a5c9]"
            >
              <div>مشاهده لینک‌های دانلود</div>
              <LeftArrow width={26} height={26} />{" "}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppBanner;
