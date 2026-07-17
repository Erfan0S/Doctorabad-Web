import Link from 'next/link';
import Image from 'next/image';
import person from '@/assets/img/bigBanner/people/0001.png';
import googlePlay from '@/assets/img/d1.jpg';
import appStore from '@/assets/img/d2.jpg';
import pwaApp from '@/assets/img/d3.jpg';
import AngleDown from '@/assets/svg/angleDown';
import { HomeStatisticsType } from '@/types/homeStatistics';

const STORE_LINK = 'flex-1 max-md:flex-none';
const STORE_IMG = 'w-full h-auto rounded-[0.65rem] max-md:rounded-lg';

const Intro = ({ statistic }: { statistic: HomeStatisticsType }) => {
  return (
    <section className="py-[60px] max-md:py-5">
      <div className="container">
        <div className="h-[550px] rounded-[56px] p-10 pb-0 flex relative bg-[radial-gradient(circle_at_72%_center,#2eb41f,#8fcc1a_35%)] max-xl:h-[450px] max-lg:h-[350px] max-lg:rounded-[40px] max-lg:p-5 max-lg:pb-0 max-md:flex-col-reverse max-md:items-stretch max-md:h-auto max-md:pt-[60px] max-md:rounded-[32px] max-md:bg-[radial-gradient(circle_at_center_72%,#2eb41f,#8fcc1a_35%)]">
          <div className="flex-[0_0_50%] w-1/2 self-end flex justify-center max-md:self-center max-md:flex-none max-md:w-full">
            <Image
              src={person}
              alt="person"
              className="max-w-[450px] h-auto"
            />
          </div>
          <div className="flex-[0_0_50%] w-1/2 self-center flex flex-col items-center text-white text-center max-md:flex-none max-md:w-full max-md:mb-10">
            <span className="font-black text-[26px] block mb-4 max-lg:text-[22px]">
              دنیای شیرین علوم‌پزشکی در دستان من!
            </span>
            <p className="text-base max-w-[400px] mb-10 font-semibold max-lg:text-sm">
              دکترآباد؛ بستر جامع آموزش و پرورش گروه علوم‌پزشکی کشور بیش از 9 سال انتخاب اول دانشجویان و فارغ التحصیلان
            </p>
            <div className="flex flex-row-reverse items-center gap-1 max-w-full w-[400px] max-md:justify-center">
              <Link href={statistic.google_play_url} target={'_blank'} className={STORE_LINK}>
                <Image src={googlePlay} alt="googlePlay" className={STORE_IMG} />
              </Link>
              <Link href={statistic.app_store_url} target={'_blank'} className={STORE_LINK}>
                <Image src={appStore} alt="appStore" className={STORE_IMG} />
              </Link>
              <Link href={statistic.direct_download_url} target={'_blank'} className={STORE_LINK}>
                <Image src={pwaApp} alt="pwaApp" className={STORE_IMG} />
              </Link>
            </div>
          </div>
          <a href={'#biBanner-drlearn'} className="absolute left-1/2 bottom-[-8px] -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer [&_svg]:animate-[market-pulse_1.5s_linear_infinite] [&_svg]:text-[#ddd] [&_svg:first-of-type]:w-4 [&_svg:first-of-type]:h-4 [&_svg:nth-of-type(2)]:w-5 [&_svg:nth-of-type(2)]:h-5 [&_svg:nth-of-type(2)]:mt-[-11.2px] [&_svg:nth-of-type(2)]:[animation-delay:0.5s] [&_svg:last-of-type]:w-6 [&_svg:last-of-type]:h-6 [&_svg:last-of-type]:mt-[-14px] [&_svg:last-of-type]:[animation-delay:1s]">
            <AngleDown />
            <AngleDown />
            <AngleDown />
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 201 47"
            fill="none"
            className="absolute w-[201px] h-auto left-1/2 bottom-[-1px] -translate-x-1/2"
          >
            <path
              d="M0 47C0 47 34 0 100.5 0C167 0 201 47 201 47H0Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Intro;
