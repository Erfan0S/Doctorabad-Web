"use client";
import Link from "next/link";
import { footerLinks } from "./links-data";
import Image from "next/image";
import { footerSocialMedia } from "./social-data";
import logo from "@/assets/img/logo.png";
import googlePlay from "@/assets/img/d1.jpg";
import appStore from "@/assets/img/d2.jpg";
import directDownload from "@/assets/img/d3.jpg";
import { footerLogos } from "./logo-data";
import { HomeStatisticsType } from "@/types/homeStatistics";

// was Footer.module.scss
const WRAPPER =
  "rounded-[40px] bg-[#f2f2f2] pt-20 px-20 pb-10 max-xl:rounded-[32px] max-xl:pt-[60px] max-xl:px-12 max-xl:pb-10 max-md:pt-10 max-md:px-6 max-md:pb-10";
const LINKS_UL =
  "list-none p-0 m-0 text-xl text-center [&_:is(a,span)]:text-[#777] [&_:is(a,span)]:text-sm [&_:is(a,span)]:font-bold [&_:is(a,span)]:leading-6 [&_:is(a,span)]:transition-all [&_:is(a,span)]:duration-150 [&_:is(a,span)]:cursor-pointer [&_:is(a,span):hover]:text-[#333]";
const APP_ITEMS =
  "flex items-center gap-1 max-lg:mb-5 [&_img]:max-w-full [&_img]:w-auto [&_img]:h-auto max-lg:[&_img]:max-w-[50%] max-sm:flex-wrap max-sm:justify-center [&>a]:w-[calc(33.33333%-4px)] [&>a]:flex-[0_0_calc(33.33333%-4px)] [&>a]:text-center max-sm:[&>a]:flex-none max-sm:[&>a]:w-auto";
const DETAIL = "text-center text-[#777] leading-6 text-sm font-bold";
// ponytail: tooltip keeps physical left-1/2 centering (symmetric either way)
const SOCIAL_TOOLTIP =
  "block absolute left-1/2 bottom-full text-center whitespace-nowrap z-[90] text-base leading-[50px] px-4 mb-2 rounded-lg bg-[#222] text-white opacity-0 invisible [transform:translate3d(-50%,-1em,0)] transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:[transform:translate3d(-50%,0,0)] after:content-[''] after:block after:absolute after:left-1/2 after:bottom-[-7px] after:ml-[-8px] after:w-0 after:h-0 after:border-solid after:border-x-8 after:border-x-transparent after:border-t-8 after:border-t-[#333] after:border-b-0";
const SOCIAL_LINK =
  "w-[42px] h-[42px] text-[#333] flex items-center justify-center rounded transition-all duration-200 max-xl:w-9 max-xl:h-9 max-xl:rounded-[3px]";

type Props = {
  statistic: HomeStatisticsType;
};

const Footer = ({ statistic }: Props) => {
  return (
    <footer className="mt-10 mb-[100px] relative max-lg:mt-5 max-lg:mb-8">
      <div className="container">
        <div className={WRAPPER}>
          <div className="flex flex-wrap -mx-[15px]">
            <div className="relative w-full px-[15px] lg:flex-[0_0_33.333333%] lg:max-w-[33.333333%]">
              <div className="max-w-[240px] mx-auto mb-5 [&_img]:w-full [&_img]:h-auto">
                <Image src={logo} alt="logo" />
              </div>
              <div className="leading-6 text-base text-[#666] text-justify max-lg:text-center">
                <p>
                  دکترآباد؛ سرزمین‌علوم‌پزشکی‌کشور
                  <br />
                  پلتفرم جامع بهداشت، درمان، آموزش و پرورش علوم پزشکی است که
                  از سال ۱۳۹۵ با تاکید بر نوآوری پایه‌گذاری گردید و اکنون با بیش
                  از یکصدهزار کاربر، انتخاب اول گروه علوم‌پزشکی کشور برای رفع
                  نیازهای روزمره است.
                </p>
              </div>
            </div>
            <div className="relative w-full px-[15px] lg:flex-[0_0_33.333333%] lg:max-w-[33.333333%]">
              <div className="flex flex-col max-lg:flex-col-reverse">
                <div className="mb-6">
                  <ul className={LINKS_UL}>
                    {footerLinks.map(({ id, href, title, action }) => (
                      <li
                        key={id}
                        className="relative"
                        onClick={() => (action ? action() : undefined)}
                      >
                        {action ? (
                          <span>{title}</span>
                        ) : (
                          <Link href={href}>{title}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={APP_ITEMS}>
                  <Link href={statistic.google_play_url} target={"_blank"}>
                    <Image src={googlePlay} alt="googlePlay" />
                  </Link>
                  <Link href={statistic.app_store_url} target={"_blank"}>
                    <Image src={appStore} alt="appStore" />
                  </Link>
                  <Link href={statistic.direct_download_url} target={"_blank"}>
                    <Image src={directDownload} alt="pwaApp" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative w-full px-[15px] lg:flex-[0_0_33.333333%] lg:max-w-[33.333333%]">
              <div className={DETAIL}>
                <p>
                  تهران، میدان انقلاب اسلامی، نبش خیابان 12 فروردین، پلاک 1302
                  واحد 304
                </p>
                <a className={DETAIL} href={"tel:09999972750"}>
                  09999972750
                </a>
                <p> شنبه تا چهارشنبه 9 تا 17 و پنج‌شنبه 9 تا 13</p>
                <a className={DETAIL} href={"mailto:info@DoctorAbad.com"}>
                  info@DoctorAbad.com
                </a>
              </div>
              <br />
              <div>
                <ul className="list-none flex items-center flex-row-reverse p-0 max-lg:justify-center">
                  {footerSocialMedia.map(({ id, href, name, svg }) => (
                    <li
                      key={id}
                      className="group me-1.5 relative rounded-xl bg-[#ccc] last-of-type:me-0"
                    >
                      <div className={SOCIAL_TOOLTIP}>
                        <span>{name}</span>
                      </div>
                      <Link
                        href={href}
                        className={SOCIAL_LINK}
                        title={name}
                        target={"_blank"}
                      >
                        {svg}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-4 pb-1">
            <ul className="flex flex-wrap list-none justify-center p-0 m-0 gap-2 [&_li]:max-w-[85px] max-md:[&_li]:max-w-[65px] [&_img]:max-w-full [&_img]:h-auto">
              {footerLogos.map(({ id, href, image, name }) => (
                <li key={id}>
                  <Link href={href} title={name} target={"_blank"}>
                    <Image src={image} alt={name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center relative mt-10 [&_p]:mb-0 [&_p]:text-[#333] [&_p]:text-[13px]">
            <p>
              کلیه حقوق متعلق به شرکت سرزمین علوم دکترآباد می‌باشد. © 2025-2016{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
