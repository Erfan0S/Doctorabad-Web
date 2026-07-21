"use client";
import Link from "next/link";
import { footerLinks } from "./links-data";
import Image from "next/image";
import { footerSocialMedia } from "./social-data";
import logo from "../../../assets/img/logo.png";
import googlePlay from "../../../assets/img/d1.jpg";
import pwaApp from "../../../assets/img/d4.png";
import directDownload from "../../../assets/img/d3.jpg";
import { footerLogos } from "./logo-data";
import { HomeStatisticsType } from "@repo/core/types/homeStatistics";

type Props = {
  statistic: HomeStatisticsType;
};

const Footer = ({ statistic }: Props) => {
  return (
    <footer className="relative mt-10 mb-[100px] max-lg:mt-5 max-lg:mb-8">
      <div className="container">
        <div className="rounded-[40px] bg-[#f2f2f2] px-20 pb-10 pt-20 max-xl:rounded-[32px] max-xl:px-12 max-xl:pt-[60px] max-md:rounded-[32px] max-md:px-6 max-md:pt-10">
          <div className="row">
            <div className="col-lg-4">
              <div className="mx-auto mb-5 mt-0 max-w-[240px] [&_img]:h-auto [&_img]:w-full">
                <Image src={logo} alt="logo" />
              </div>
              <div className="text-justify text-base leading-6 text-[#666] max-lg:text-center">
                <p>
                  دکترآباد؛ سرزمین‌علوم‌پزشکی‌کشور
                  <br />
                  پلتفرم جامع بهداشت، درمان، آموزش و پرورش علوم پزشکی است که از
                  سال ۱۳۹۵ با تاکید بر نوآوری پایه‌گذاری گردید و اکنون با بیش از
                  یکصدهزار کاربر، انتخاب اول گروه علوم‌پزشکی کشور برای رفع
                  نیازهای روزمره است.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="flex flex-col max-lg:flex-col-reverse">
                <div className="mb-6">
                  <ul className="m-0 list-none p-0 text-center text-[20px]">
                    {footerLinks.map(({ id, href, title, action }) => (
                      <li
                        key={id}
                        onClick={() => (action ? action() : undefined)}
                        className="relative"
                      >
                        {action ? (
                          <span className="cursor-pointer text-sm font-bold leading-6 text-[#777] transition duration-150 hover:text-[#333]">
                            {title}
                          </span>
                        ) : (
                          <Link
                            href={href}
                            className="cursor-pointer text-sm font-bold leading-6 text-[#777] transition duration-150 hover:text-[#333]"
                          >
                            {title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-1 max-lg:mb-5 max-sm:flex-wrap max-sm:justify-center">
                  <Link
                    href={statistic.google_play_url}
                    target={"_blank"}
                    className="w-[calc(33.33333%-4px)] flex-[0_0_calc(33.33333%-4px)] text-center max-sm:w-auto max-sm:flex-none"
                  >
                    <Image
                      src={googlePlay}
                      alt="googlePlay"
                      className="h-auto max-w-full max-lg:max-w-[50%]"
                    />
                  </Link>
                  <Link
                    href={statistic.pwa_url}
                    target={"_blank"}
                    className="w-[calc(33.33333%-4px)] flex-[0_0_calc(33.33333%-4px)] text-center max-sm:w-auto max-sm:flex-none"
                  >
                    <Image
                      src={pwaApp}
                      alt="pwaApp"
                      className="h-auto max-w-full max-lg:max-w-[50%]"
                    />
                  </Link>
                  <Link
                    href={statistic.direct_download_url}
                    target={"_blank"}
                    className="w-[calc(33.33333%-4px)] flex-[0_0_calc(33.33333%-4px)] text-center max-sm:w-auto max-sm:flex-none"
                  >
                    <Image
                      src={directDownload}
                      alt="pwaApp"
                      className="h-auto max-w-full max-lg:max-w-[50%]"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="text-center text-sm font-bold leading-6 text-[#777]">
                <p>
                  تهران، میدان انقلاب اسلامی، خیابان ۱۲ فروردین، خیابان شهدای
                  ژاندارمری، پلاک ۸۸، واحد ۵
                </p>
                <p>کدپستی: 1314733917 </p>
                <a
                  className="text-center text-sm font-bold leading-6 text-[#777]"
                  href={"tel:09999972750"}
                >
                  09999972750
                </a>
                <p> شنبه تا چهارشنبه 9 تا 17 و پنج‌شنبه 9 تا 13</p>
                <a
                  className="text-center text-sm font-bold leading-6 text-[#777]"
                  href={"mailto:info@DoctorAbad.com"}
                >
                  info@DoctorAbad.com
                </a>
              </div>
              <br />
              <div>
                <ul className="flex list-none flex-row-reverse items-center p-0 max-lg:justify-center">
                  {footerSocialMedia.map(
                    ({ id, href, name, svg, className }) => (
                      <li
                        key={id}
                        className="group relative ms-1.5 rounded-xl bg-[#ccc] last:ms-0"
                      >
                        <div className="invisible absolute bottom-full left-1/2 z-[90] mb-2 block whitespace-nowrap rounded-lg bg-[#222] px-4 text-center text-base leading-[50px] text-white opacity-0 transition-all duration-300 ease-in-out [transform:translate3d(-50%,-1em,0)] after:absolute after:-bottom-[7px] after:left-1/2 after:-ml-2 after:block after:h-0 after:w-0 after:border-solid after:border-0 after:border-l-8 after:border-r-8 after:border-t-8 after:border-l-transparent after:border-r-transparent after:border-t-[#333] after:content-[''] group-hover:visible group-hover:opacity-100 group-hover:duration-200 group-hover:[transform:translate3d(-50%,0,0)]">
                          <span>{name}</span>
                        </div>
                        <Link
                          href={href}
                          className={`flex h-[42px] w-[42px] items-center justify-center rounded-[4px] text-[#333] transition-all duration-200 ease-in-out max-xl:h-9 max-xl:w-9 max-xl:rounded-[3px] ${className}`}
                          title={name}
                          target={"_blank"}
                        >
                          {svg}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="px-0 pb-1 pt-4">
            <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
              {footerLogos.map(({ id, href, image, name }) => (
                <li key={id} className="max-w-[85px] max-md:max-w-[65px]">
                  <Link href={href} title={name} target={"_blank"}>
                    <Image
                      src={image}
                      alt={name}
                      className="h-auto max-w-full"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mt-10 text-center">
            <p className="mb-0 text-[13px] text-[#333]">
              کلیه حقوق متعلق به شرکت سرزمین علوم دکترآباد می‌باشد. ©
              2025-2016{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
