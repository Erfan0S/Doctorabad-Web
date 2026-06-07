import Link from "next/link";
import style from "./BigBanner.module.scss";
import Image, { StaticImageData } from "next/image";
import { Squircle } from "@repo/shared_modules/icons";

interface Props {
  icon: StaticImageData;
  title: string;
  subTitle: string;
  description: string;
  image: StaticImageData;
  primaryButtonLink: string;
  secondaryButtonLink: string;
  primaryColor: string;
  secondaryColor: string;
  id: string;
}

const BigBanner = ({
  image,
  icon,
  title,
  subTitle,
  description,
  primaryButtonLink,
  secondaryButtonLink,
  primaryColor,
  secondaryColor,
  id,
}: Props) => {
  return (
    <section className={style.bigBanner} id={"biBanner-" + id}>
      <div className="container">
        <div
          className={style.bigBannerWrapper}
          style={{
            background: `${primaryColor}`,
          }}
        >
          <div className={style.bigBannerImage}>
            <Image src={image || ""} alt="image" />
          </div>
          <div className={style.bigBannerContent}>
            <div className={style.bigBannerHeader}>
              <div className={style.bigBannerIcon}>
                <Squircle fill="#fff" />
                <Image src={icon || ""} alt="image" />
              </div>
              <div className={style.bigBannerTitle}>
                <span>{title}</span>
                <small>{subTitle}</small>
              </div>
            </div>
            <div className={style.bigBannerBody}>
              <p>{description}</p>
            </div>
            <div className={style.bigBannerFooter}>
              <Link
                className={style.bigBannerPrimaryButton}
                href={primaryButtonLink}
                style={{ color: primaryColor }}
              >
                بزن‌بریم
              </Link>
              <Link
                className={style.bigBannerSecondaryButton}
                href={secondaryButtonLink}
              >
                اطلاعات‌‌بیشتر
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigBanner;
