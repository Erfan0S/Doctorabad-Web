import style from "./marketHeader.module.scss";
import Nav from "../nav";
import CartButton from "../cartButton";
import Search from "../search";
import Ads from "../ads";

import { api } from "@/api/Api";
import { numLatinToAr } from "@/constants/regex";
import LogoProvider from "../logo/logoProvider";

export const MarketHeaderPlaceholder = () => (
  <header className={style.header} aria-hidden>
    <div className={style.headerTop}>
      <div className="container">
        <div className={style.headerTopWrapper}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                width: "100%",
                height: 36,
                borderRadius: 6,
              }}
            />
          </div>
          <div style={{ width: 120, height: 40, marginLeft: 16 }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 6,
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <div className={style.headerBottom}>
      <div className="container">
        <div className={style.headerBottomWrapper}>
          <nav style={{ flex: 1 }}>
            <div
              style={{
                width: "100%",
                height: 36,
                borderRadius: 6,
              }}
            />
          </nav>
          <div className={style.headerBottomWrapperLeftSection}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const MarketHeader = async () => {
  try {
    const retry = async <T,>(
      fn: () => Promise<T>,
      retries = 2,
      delay = 500,
    ): Promise<T> => {
      let lastError: any;
      for (let i = 0; i <= retries; i++) {
        try {
          return await fn();
        } catch (err) {
          lastError = err;
          if (i < retries)
            await new Promise((r) => setTimeout(r, delay * Math.pow(2, i)));
        }
      }
      throw lastError;
    };

    const navData = (await retry(() => api.getCategoriesList(), 2, 300)).data;

    const festivalData = (await retry(() => api.getFestivalInfo(), 2, 300))
      .data;

    const productCounts = (await retry(() => api.getProductCount(), 2, 300))
      .data.data;

    return (
      <>
        {festivalData?.data && <Ads {...festivalData.data} />}
        <header className={style.header}>
          <div className={style.headerTop}>
            <div className="container">
              <div className={style.headerTopWrapper}>
                <Search
                  productCount={numLatinToAr(
                    (productCounts || 3000).toString(),
                  )}
                />
                <LogoProvider />
              </div>
            </div>
          </div>
          <div className={style.headerBottom}>
            <div className="container">
              <div className={style.headerBottomWrapper}>
                <Nav navData={navData || []} />
                <div className={style.headerBottomWrapperLeftSection}>
                  <CartButton />
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  } catch (error) {
    console.error(error);
    // On persistent failure, render the placeholder instead of returning null
    return <MarketHeaderPlaceholder />;
  }
};
export default MarketHeader;
