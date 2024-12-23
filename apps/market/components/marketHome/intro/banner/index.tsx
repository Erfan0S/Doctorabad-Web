import Image from 'next/image';
import Link from 'next/link';
import style from './MainBanner.module.scss';
import { Banner } from '@/types/banner';

const MainBanner: React.FC<Banner> = ({ pic_url, url, title }) => {
  const ImageComponent = () => <Image fill src={pic_url} alt={title || 'banner'} />;
  return (
    <div className={style.mainBanner}>
      {url ? (
        <Link href={url}>
          <ImageComponent />
        </Link>
      ) : (
        <ImageComponent />
      )}
    </div>
  );
};

export default MainBanner;
