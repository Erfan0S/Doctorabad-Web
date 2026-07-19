import Link from "next/link";
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

const BUTTON_BASE =
  "leading-[46px] font-semibold text-[18px] px-6 rounded-[12px] min-w-[160px] text-center transition-all duration-150 max-[992px]:leading-[40px] max-[992px]:px-2 max-[992px]:min-w-[130px] max-[576px]:leading-[36px] max-[576px]:text-[16px] max-[576px]:px-1 max-[576px]:rounded-[8px] max-[576px]:min-w-[110px]";

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
    <section className="py-[60px] max-[768px]:py-5" id={"biBanner-" + id}>
      <div className="container">
        <div
          className="flex h-[550px] flex-row-reverse rounded-[56px] px-4 pt-4 pb-0 max-[992px]:h-[400px] max-[992px]:rounded-[40px] max-[992px]:px-5 max-[992px]:pt-5 max-[768px]:h-auto max-[768px]:flex-col-reverse max-[768px]:items-stretch max-[768px]:rounded-[32px] max-[768px]:pt-[60px] max-[576px]:pt-10"
          style={{
            background: `${primaryColor}`,
          }}
        >
          <div className="flex w-1/2 flex-[0_0_50%] justify-center self-end max-[992px]:w-[45%] max-[992px]:flex-[0_0_45%] max-[768px]:w-full max-[768px]:flex-[unset] max-[768px]:self-center">
            <Image
              src={image || ""}
              alt="image"
              className="h-auto w-[320px] max-w-full"
            />
          </div>
          <div className="flex w-1/2 flex-[0_0_50%] flex-col items-center self-center max-[992px]:w-[55%] max-[992px]:flex-[0_0_55%] max-[768px]:mb-10 max-[768px]:w-full max-[768px]:flex-[unset] max-[576px]:mb-5">
            <div className="mb-10 flex items-center max-[576px]:mb-5">
              <div className="relative ml-5 flex h-[100px] w-[100px] items-center justify-center [&>svg]:absolute [&>svg]:h-full [&>svg]:w-full max-[992px]:h-[85px] max-[992px]:w-[85px] max-[576px]:h-[65px] max-[576px]:w-[65px]">
                <Squircle fill="#fff" />
                <Image
                  src={icon || ""}
                  alt="image"
                  className="relative z-10 h-20 w-20 max-[992px]:h-[70px] max-[992px]:w-[70px] max-[576px]:h-[50px] max-[576px]:w-[50px]"
                />
              </div>
              <div className="flex flex-col text-white">
                <span className="text-[40px] font-black max-[992px]:text-[28px] max-[576px]:text-[20px]">
                  {title}
                </span>
                <small className="text-[22px] font-black max-[992px]:text-[18px] max-[576px]:text-[14px]">
                  {subTitle}
                </small>
              </div>
            </div>
            <div className="mb-10 max-w-[300px] text-center text-white max-[992px]:max-w-full max-[576px]:mb-5">
              <p className="mb-0 text-[18px] font-semibold leading-[30px] max-[576px]:text-[14px]">
                {description}
              </p>
            </div>
            <div className="flex flex-row-reverse items-center gap-3">
              <Link
                className={`${BUTTON_BASE} border-2 border-solid border-transparent bg-white hover:border-white hover:bg-transparent hover:!text-white`}
                href={primaryButtonLink}
                style={{ color: primaryColor }}
              >
                بزن‌بریم
              </Link>
              <Link
                className={`${BUTTON_BASE} border-2 border-solid border-white text-white hover:bg-white hover:text-[#666]`}
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
