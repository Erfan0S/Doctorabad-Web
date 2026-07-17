import Nav from "../nav";
import CartButton from "../cartButton";
import Search from "../search";
import Ads from "../ads";

import { api } from "@/api/Api";
import { numLatinToAr } from "@/constants/regex";
import LogoProvider from "../logo/logoProvider";

// was marketHeader.module.scss (dead .headerTopButtons dropped - never used in TSX)
// ponytail: sticky offset keeps physical right-[150px] (matches the fixed sidebar side)
const HEADER = "sticky top-0 right-[150px] bg-header-bg mb-[30px] z-[700]";
const TOP = "py-3 max-md:py-2";
const TOP_WRAPPER = "flex items-center max-md:flex-wrap";
const BOTTOM = "bg-orange max-xl:py-[5px]";
const BOTTOM_WRAPPER = "flex items-center relative justify-between";
const LEFT_SECTION =
  "flex [&_button]:bg-transparent [&_button]:border-0 [&_button]:h-[39px] [&_button]:w-[50px] [&_button_img]:max-w-full [&_button_img]:max-h-full";

export const MarketHeaderPlaceholder = () => (
  <header className={HEADER} aria-hidden>
    <div className={TOP}>
      <div className="container">
        <div className={TOP_WRAPPER}>
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
    <div className={BOTTOM}>
      <div className="container">
        <div className={BOTTOM_WRAPPER}>
          <nav style={{ flex: 1 }}>
            <div
              style={{
                width: "100%",
                height: 36,
                borderRadius: 6,
              }}
            />
          </nav>
          <div className={LEFT_SECTION}>
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
        <header className={HEADER}>
          <div className={TOP}>
            <div className="container">
              <div className={TOP_WRAPPER}>
                <Search
                  productCount={numLatinToAr(
                    (productCounts || 3000).toString(),
                  )}
                />
                <LogoProvider />
              </div>
            </div>
          </div>
          <div className={BOTTOM}>
            <div className="container">
              <div className={BOTTOM_WRAPPER}>
                <Nav navData={navData || []} />
                <div className={LEFT_SECTION}>
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
