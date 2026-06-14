import React from "react";
import style from "./DownloadAppBanner.module.scss";
import DoctorAbadQrCode from "@repo/shared_modules/images/DoctorAbadQrCode.png";
import DoctorAbadLogoText from "@repo/shared_modules/images/DoctorAbadLogoText.png";
import DrAbadMobile from "../../../assets/img/bigBanner/people/KadKhoda-Mobile.png";
import Image from "next/image";
import LeftArrow from "@/assets/svg/leftArrow";
import DiviceSwitchShell from "@repo/shared_modules/components/DiviceSwitchShell";
const DownloadAppBanner = () => {
  return (
    <section className="container">
      <div className={style.container}>
        <div className={style.left}>
          <DiviceSwitchShell
            desktop={
              <Image
                src={DrAbadMobile}
                alt="Doctor Abad"
                className={style.leftImg}
              />
            }
            mobile={null}
          />
        </div>
        <div className={style.right}>
          <div className={style.qrCode}>
            <Image
              src={DoctorAbadQrCode}
              alt="QR Code"
              className={style.qrCodeScan}
            />
            <div className={style.qrCodeScanText}>برای دانلود اسکن کنید!</div>
          </div>
          <div className={style.text}>
            <div className={style.textTop}>
              <div className={style.textTopTitle}>
                اپلیکیشن{" "}
                <span>
                  <Image
                    src={DoctorAbadLogoText}
                    alt="دکترآباد"
                    className={style.logotext}
                  />
                </span>
              </div>
              <div className={style.textTopDescription}>
                کاربری راحت‌تر و کسب امتیاز بیشتر
              </div>
            </div>
            <div className={style.textBottom}>
              <div>مشاهده لینک‌های دانلود</div>
              <LeftArrow width={26} height={26} />{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppBanner;
