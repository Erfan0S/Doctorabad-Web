import style from './marketHeader.module.scss';
import Nav from '../nav';
import CartButton from '../cartButton';
import Search from '../search';
import Ads from '../ads';

import { api } from '@/api/Api';
import { numLatinToAr } from '@/constants/regex';
import LogoProvider from '../logo/logoProvider';

const MarketHeader = async () => {
  const navData = (await api.getCategoriesList()).data;
  const festivalData = (await api.getFestivalInfo()).data;
  const productCounts = (await api.getProductCount()).data.data;

  return (
    <>
      {festivalData.data && <Ads {...festivalData.data} />}
      <header className={style.header}>
        <div className={style.headerTop}>
          <div className="container">
            <div className={style.headerTopWrapper}>
              <Search productCount={numLatinToAr(productCounts.toString())} />
              <LogoProvider />
            </div>
          </div>
        </div>
        <div className={style.headerBottom}>
          <div className="container">
            <div className={style.headerBottomWrapper}>
              <Nav navData={navData} />
              <div className={style.headerBottomWrapperLeftSection}>
                <CartButton />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default MarketHeader;
