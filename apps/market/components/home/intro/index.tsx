import Link from 'next/link';
import Image from 'next/image';
import person from '@/assets/img/bigBanner/people/0001.png';
import googlePlay from '@/assets/img/d1.jpg';
import appStore from '@/assets/img/d2.jpg';
import pwaApp from '@/assets/img/d3.jpg';
import style from './Intro.module.scss';
import AngleDown from '@/assets/svg/angleDown';
import { HomeStatisticsType } from '@/types/homeStatistics';

const Intro = ({ statistic }: { statistic: HomeStatisticsType }) => {
  return (
    <section className={style.intro}>
      <div className="container">
        <div className={style.introWrapper}>
          <div className={style.introImage}>
            <Image src={person} alt="person" />
          </div>
          <div className={style.introContent}>
            <span>دنیای شیرین علوم‌پزشکی در دستان من!</span>
            <p>
              دکترآباد؛ بستر جامع آموزش و پرورش گروه علوم‌پزشکی کشور بیش از 8 سال انتخاب اول دانشجویان و فارغ
              التحصیلان
            </p>
            <div>
              <Link href={statistic.google_play_url} target={'_blank'}>
                <Image src={googlePlay} alt="googlePlay" />
              </Link>
              <Link href={statistic.app_store_url} target={'_blank'}>
                <Image src={appStore} alt="appStore" />
              </Link>
              <Link href={statistic.direct_download_url} target={'_blank'}>
                <Image src={pwaApp} alt="pwaApp" />
              </Link>
            </div>
          </div>
          <a href={'#biBanner-drlearn'} className={style.introArrow}>
            <AngleDown />
            <AngleDown />
            <AngleDown />
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" width="201px" height="31px">
            <path
              fillRule="evenodd"
              fill="rgb(255, 255, 255)"
              d="M-0.000,31.000 C-0.000,31.000 0.214,31.000 32.000,31.000 C66.214,31.000 73.231,0.059 99.1000,-0.000 C126.743,-0.059 133.006,31.239 171.1000,31.000 C200.434,30.825 199.1000,31.000 199.1000,31.000 L199.1000,31.000 L-0.000,31.000 L-0.000,31.000 Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Intro;
