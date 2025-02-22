"use client";
import Link from "next/link";
import { footerLinks } from "./links-data";
import Image from "next/image";
import style from "./Footer.module.scss";
import { footerSocialMedia } from "./social-data";
import logo from "@/assets/img/logo.png";
import googlePlay from "@/assets/img/d1.jpg";
import appStore from "@/assets/img/d2.jpg";
import directDownload from "@/assets/img/d3.jpg";
import { footerLogos } from "./logo-data";
import { HomeStatisticsType } from "@/types/homeStatistics";

type Props = {
  statistic: HomeStatisticsType;
};

const Footer = ({ statistic }: Props) => {
  return (
    <footer className={style.footer}>
      <div className="container">
        <div className={style.footerWrapper}>
          <div className="row">
            <div className="col-lg-4">
              <div className={style.footerLogo}>
                <Image src={logo} alt="logo" />
              </div>
              <div className={style.footerAbout}>
                <p>
                  دکترآباد؛ سرزمین‌علوم‌پزشکی‌کشور
                  <br />
                  پلتفرم جامع بهداشت، درمان، آموزش و پرورش علوم پزشکی است است که
                  از سال ۱۳۹۵ با تاکید بر نوآوری پایه‌گذاری گردید و اکنون با بیش
                  از یکصدهزار کاربر، انتخاب اول گروه علوم‌پزشکی کشور برای رفع
                  نیازهای روزمره است.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className={style.footerCenterCol}>
                <div className={style.footerLinks}>
                  <ul>
                    {footerLinks.map(({ id, href, title, action }) => (
                      <li
                        key={id}
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
                <div className={style.footerAppItems}>
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
            <div className="col-lg-4">
              <div className={style.footerDetail}>
                <p>
                  تهران، میدان انقلاب اسلامی، نبش خیابان 12 فروردین، پلاک 1302
                  واحد 304
                </p>
                <a className={style.footerDetail} href={"tel:09999972750"}>
                  09999972750
                </a>
                <p> شنبه تا چهارشنبه 9 تا 17 و پنج‌شنبه 9 تا 13</p>
                <a
                  className={style.footerDetail}
                  href={"mailto:info@DoctorAbad.com"}
                >
                  info@DoctorAbad.com
                </a>
              </div>
              <br />
              <div className={style.footerSocials}>
                <ul>
                  {footerSocialMedia.map(
                    ({ id, href, name, svg, className }) => (
                      <li key={id}>
                        <div className={style.footerSocialsItemDesc}>
                          <span>{name}</span>
                        </div>
                        <Link
                          href={href}
                          className={className}
                          title={name}
                          target={"_blank"}
                        >
                          {svg}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className={style.footerLogos}>
            <ul>
              {footerLogos.map(({ id, href, image, name }) => (
                <li key={id}>
                  <Link href={href} title={name} target={"_blank"}>
                    <Image src={image} alt={name} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.footerCopyRight}>
            <p>
              کلیه حقوق متعلق به شرکت سرزمین علوم دکترآباد می‌باشد. © 2024-2016{" "}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
