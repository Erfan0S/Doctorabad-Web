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

const COL_LG_BY_COUNT: Record<number, string> = {
  1: "lg:flex-[0_0_100%] lg:max-w-[100%]",
  2: "lg:flex-[0_0_50%] lg:max-w-[50%]",
  3: "lg:flex-[0_0_33.333333%] lg:max-w-[33.333333%]",
  4: "lg:flex-[0_0_25%] lg:max-w-[25%]",
  6: "lg:flex-[0_0_16.666667%] lg:max-w-[16.666667%]",
  12: "lg:flex-[0_0_8.333333%] lg:max-w-[8.333333%]",
};

const Banners: React.FC<Props> = ({
  data,
  imageOptions,
  showTitles = false,
  className = "",
}) => {
  return (
    <section className="py-10 max-md:py-0">
      <div className="container">
        <div className="flex flex-wrap -mx-[15px] max-lg:[&>div]:mb-[15px]">
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
                    : `${COL_LG_BY_COUNT[data.length] ?? ""} relative w-full px-[15px] sm:flex-[0_0_50%] sm:max-w-[50%]`
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
