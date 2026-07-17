import Image from "next/image";
import Link from "next/link";
import { Banner } from "@/types/banner";

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
    <section className="py-10 max-md:py-0 max-lg:[&_.row>div]:mb-[15px]">
      <div className="container">
        <div className="row">
          {data.map(({ id, title, pic_url, url }) => {
            const BannerItem = () => (
              <>
                <Image
                  {...imageOptions}
                  src={pic_url || ""}
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
                  className="market-banner-item"
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
