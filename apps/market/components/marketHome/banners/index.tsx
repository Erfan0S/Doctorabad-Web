import Image, { ImageProps } from "next/image";
import style from "./Banners.module.scss";
import Link from "next/link";
import { Banner } from "@/types/banner";
import { placeHolderDataUrl } from "@repo/core/constants/placeHolderDataUrl";

interface Props {
  data: Banner[];
  showTitles?: boolean;
  imageOptions: {
    width?: number;
    height?: number;
    fill?: boolean;
    parentHeight?: number;
  };
  className?: string;
}

const Banners: React.FC<Props> = ({
  data,
  imageOptions,
  showTitles = false,
  className = "",
}) => {
  return (
    <section className={style.banners}>
      <div className="container">
        <div className="row">
          {data.map(({ id, title, pic_url, url }) => {
            const BannerItem = () => (
              <>
                <Image
                  {...imageOptions}
                  src={pic_url || placeHolderDataUrl}
                  alt={title || "Banner"}
                />
                {showTitles && <span>{title}</span>}
              </>
            );
            return (
              <div
                key={id}
                className={
                  className.length
                    ? className
                    : `col-lg-${12 / data.length} col-sm-6`
                }
              >
                <div
                  className={style.bannersItem}
                  style={{ height: imageOptions.parentHeight || "auto" }}
                >
                  {url ? (
                    <Link href={url} title={title} target="_blank">
                      <BannerItem />
                    </Link>
                  ) : (
                    <BannerItem />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Banners;
