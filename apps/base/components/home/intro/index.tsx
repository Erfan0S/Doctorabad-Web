import Link from "next/link";
import Image from "next/image";
import person from "@/assets/img/bigBanner/people/KadKhoda-Mobile.png";
import googlePlay from "@/assets/img/d1.jpg";
import appStore from "@/assets/img/d2.jpg";
import direct from "@/assets/img/d3.jpg";
import pwa from "@/assets/img/d4.png";
import anardoni from "@/assets/img/d6.jpg";
import iApps from "@/assets/img/d7.jpg";
import sibIrani from "@/assets/img/d8.jpg";
import { LeftArrow } from "@/assets/svg/leftArrow";
import { AngleDown } from "@repo/shared_modules/icons";
import { HomeStatisticsType } from "@/types/homeStatistics";

const Intro = ({ statistic }: { statistic: HomeStatisticsType }) => {
  return (
    <section className="py-[60px] max-[768px]:py-5">
      <div className="container">
        <div className="relative flex h-[550px] rounded-[56px] bg-green-base px-10 pt-10 pb-0 [&>svg]:absolute [&>svg]:left-1/2 [&>svg]:bottom-[-1px] [&>svg]:h-auto [&>svg]:w-[201px] [&>svg]:-translate-x-1/2 max-[1200px]:h-[450px] max-[992px]:h-[350px] max-[992px]:rounded-[40px] max-[992px]:px-5 max-[992px]:pt-5 max-[768px]:h-auto max-[768px]:flex-col-reverse max-[768px]:items-stretch max-[768px]:rounded-[32px] max-[768px]:pt-[60px] max-[768px]:[background:radial-gradient(circle_at_center_72%,#2eb41f,#8fcc1a_35%)]">
          <div className="flex w-1/2 flex-[0_0_50%] justify-center self-end max-[768px]:w-full max-[768px]:flex-[unset] max-[768px]:self-center">
            <Image src={person || ""} alt="person" className="h-auto max-w-[320px]" />
          </div>
          <div className="flex w-1/2 flex-[0_0_50%] flex-col items-center self-center text-center text-white max-[768px]:mb-10 max-[768px]:w-full max-[768px]:flex-[unset]">
            <span className="mb-4 block text-[26px] font-black max-[992px]:text-[22px]">دنیای شیرین علوم‌پزشکی در دستان من!</span>
            <p className="mb-10 max-w-[400px] text-[16px] font-semibold max-[992px]:text-[14px]">
              دکترآباد؛ بستر جامع آموزش و پرورش گروه علوم‌پزشکی کشور بیش از 9
              سال انتخاب اول دانشجویان و فارغ التحصیلان
            </p>

            <div className="grid w-full max-w-[400px] grid-cols-3 gap-1 [&_a]:block [&_a]:w-full [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[0.65rem] max-[768px]:max-w-[360px] max-[768px]:[&_img]:rounded-[0.5rem] max-[480px]:grid-cols-2">
              <Link href={statistic.google_play_url} target={"_blank"}>
                <Image src={googlePlay || ""} alt="googlePlay" />
              </Link>
              <Link href="/pwa" target={"_blank"}>
                <Image src={pwa || ""} alt="pwaApp" />
              </Link>
              <Link href={statistic.direct_download_url} target={"_blank"}>
                <Image src={direct || ""} alt="directDownload" />
              </Link>
              <Link
                href="https://anardoni.com/ios/app/zgbjGaxmN?lng=fa"
                target={"_blank"}
              >
                <Image src={anardoni || ""} alt="anardoni" />
              </Link>
              <Link
                href="https://iapps.ir/app/DoctorAbad/986479615"
                target={"_blank"}
              >
                <Image src={iApps || ""} alt="iApps" />
              </Link>
              <Link
                href="https://sibirani.com/apps/DoctorAbad/"
                target={"_blank"}
              >
                <Image src={sibIrani || ""} alt="sibIrani" />
              </Link>
            </div>

            <Link
              className="mt-[30px] flex items-center justify-center gap-[5px] text-inherit no-underline hover:text-inherit hover:no-underline active:text-inherit visited:text-inherit [&_p]:mb-0 [&_p]:text-inherit"
              href="/changelog"
            >
              <p>لیست تغییرات در بروزرسانی جدید</p>
              <LeftArrow width={22} height={22} />
            </Link>
          </div>
          <a
            href={"#biBanner-drlearn"}
            className="absolute left-1/2 bottom-[-8px] z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center"
          >
            <AngleDown className="h-4 w-4 text-[#ddd] animate-[pulse-grow_1.5s_linear_infinite]" />
            <AngleDown className="mt-[-11.2px] h-5 w-5 text-[#ddd] animate-[pulse-grow_1.5s_linear_infinite] [animation-delay:0.5s]" />
            <AngleDown className="mt-[-14px] h-6 w-6 text-[#ddd] animate-[pulse-grow_1.5s_linear_infinite] [animation-delay:1s]" />
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="201px" height="31px">
            <path
              fillRule="evenodd"
              fill="rgb(255, 255, 255)"
              d="M-0.000,31.000 C-0.000,31.000 0.214,31.000 32.000,31.000 C66.214,31.000 73.231,0.059 99.1000,-0.000 C126.743,-0.059 133.006,31.239 171.1000,31.000 C200.434,30.825 199.1000,31.000 199.1000,31.000 L199.1000,31.000 L-0.000,31.000 L-0.000,31.000 Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Intro;
