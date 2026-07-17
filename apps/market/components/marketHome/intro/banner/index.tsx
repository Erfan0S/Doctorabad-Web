import Image from 'next/image';
import Link from 'next/link';
import { Banner } from '@/types/banner';

const MainBanner: React.FC<Banner> = ({ pic_url, url, title }) => {
  const ImageComponent = () => (
    <Image fill src={pic_url} alt={title || 'banner'} className="rounded-[20px] w-full h-full object-cover" />
  );
  return (
    <div className="h-[175px] rounded-[20px] mb-[30px] relative last:mb-0 max-lg:hidden">
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
