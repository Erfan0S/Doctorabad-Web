import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

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

const BTN_BASE =
  "leading-[46px] border-2 border-solid font-semibold text-lg px-6 rounded-xl min-w-[160px] text-center transition-all duration-150 max-lg:leading-10 max-lg:px-2 max-lg:min-w-[130px] max-sm:leading-9 max-sm:text-base max-sm:px-1 max-sm:rounded-lg max-sm:min-w-[110px]";

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
    <section className="py-[60px] max-md:py-5" id={'biBanner-' + id}>
      <div className="container">
        <div
          className="flex flex-row-reverse h-[550px] rounded-[56px] p-4 pb-0 max-lg:h-[400px] max-lg:rounded-[40px] max-lg:p-5 max-lg:pb-0 max-md:flex-col-reverse max-md:items-stretch max-md:h-auto max-md:pt-[60px] max-md:rounded-[32px] max-sm:pt-10"
          style={{
            background: `radial-gradient(circle at 72% center, ${primaryColor}, ${secondaryColor} 35%)`,
          }}
        >
          <div className="flex-[0_0_50%] w-1/2 self-end flex justify-center max-lg:flex-[0_0_45%] max-lg:w-[45%] max-md:self-center max-md:flex-none max-md:w-full">
            <Image
              src={image}
              alt={title}
              width={450}
              height={450}
              className="w-[450px] max-w-full h-auto"
            />
          </div>
          <div className="flex-[0_0_50%] w-1/2 self-center flex flex-col items-center max-lg:flex-[0_0_55%] max-lg:w-[55%] max-md:flex-none max-md:w-full max-md:mb-10 max-sm:mb-5">
            <div className="flex items-center mb-10 max-sm:mb-5">
              <div className="w-[100px] h-[100px] relative flex items-center justify-center me-5 max-lg:w-[85px] max-lg:h-[85px] max-sm:w-[65px] max-sm:h-[65px]">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  className="absolute w-full h-full"
                >
                  <circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.2)" />
                </svg>
                <Image
                  src={icon}
                  alt={title}
                  width={80}
                  height={80}
                  className="relative z-10 w-20 h-20 max-lg:w-[70px] max-lg:h-[70px] max-sm:w-[50px] max-sm:h-[50px]"
                />
              </div>
              <div className="flex flex-col text-white">
                <span className="text-[40px] font-black max-lg:text-[28px] max-sm:text-xl">
                  {title}
                </span>
                <small className="text-[22px] font-black max-lg:text-lg max-sm:text-sm">
                  {subTitle}
                </small>
              </div>
            </div>
            <div className="text-white text-center max-w-[300px] mb-10 max-lg:max-w-full max-sm:mb-5">
              <p className="leading-[30px] font-semibold text-lg mb-0 max-sm:text-sm">
                {description}
              </p>
            </div>
            <div className="flex items-center flex-row-reverse gap-3">
              <Link
                href={primaryButtonLink}
                className={`${BTN_BASE} bg-white border-transparent hover:bg-transparent hover:!text-white hover:border-white`}
                style={{ color: primaryColor }}
              >
                بزن‌بریم
              </Link>
              <Link
                href={secondaryButtonLink}
                className={`${BTN_BASE} border-white text-white hover:bg-white hover:text-[#666]`}
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
