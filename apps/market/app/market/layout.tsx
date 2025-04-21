import Content from '@/components/common/content';
import { homeMetadata, homeViewPort } from '@/metadata/home';
import 'react-toastify/dist/ReactToastify.css';
import MarketHeader from '@/components/common/header/market';

export const metadata = homeMetadata;
export const viewPort = homeViewPort;

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <MarketHeader /> */}
      <Content>{children}</Content>
    </>
  );
}
