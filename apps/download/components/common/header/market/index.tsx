"use client";
import style from "./marketHeader.module.scss";
import Nav from "../nav";
import CartButton from "../cartButton";
import Search from "../search";
import Ads from "../ads";

import { api } from "@/api/Api";
import { numLatinToAr } from "@/constants/regex";
import LogoProvider from "../logo/logoProvider";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";

const MarketHeader = () => {
  const { data: navData, isLoading: navLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.getCategoriesList()).data,
  });

  const { data: festivalData } = useQuery({
    queryKey: ["festival"],
    queryFn: async () => (await api.getFestivalInfo()).data,
  });

  const { data: productCounts } = useQuery({
    queryKey: ["productCount"],
    queryFn: async () => (await api.getProductCount()).data.data,
  });
  return (
    <>
      {festivalData?.data && <Ads {...festivalData.data} />}
      <header className={style.header}>
        <div className={style.headerTop}>
          <div className="container">
            <div className={style.headerTopWrapper}>
              <Search
                productCount={numLatinToAr((productCounts || 3000).toString())}
              />
              <LogoProvider />
            </div>
          </div>
        </div>
        <div className={style.headerBottom}>
          <div className="container">
            <div className={style.headerBottomWrapper}>
              {navLoading ? (
                <Loading app={Apps.MARKET} />
              ) : (
                <Nav navData={navData || []} />
              )}
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
