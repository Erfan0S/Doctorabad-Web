import MainBanner from "./banner";
import { Banner } from "@/types/banner";
import OrderInformation from "./orderInformation";
import { api } from "@/api/Api";
import { MainSlider } from "@repo/shared_modules/components";
import { Apps } from "@repo/core/types/general";
type Props = {
  mainSliders: Banner[];
  sideSliders: Banner[];
};
let s = 1;
const Intro = async ({ mainSliders, sideSliders }: Props) => {
  const order = await api.getLastProcessingOrder().catch(() => null);

  return (
    <section className="mb-10 max-md:mb-4">
      <div className="container">
        <div className="flex flex-wrap -mx-[15px]">
          <div className="relative w-full px-[15px] lg:flex-[0_0_66.666667%] lg:max-w-[66.666667%]">
            <MainSlider app={Apps.MARKET} banners={mainSliders} />
          </div>
          <div className="relative w-full px-[15px] lg:flex-[0_0_33.333333%] lg:max-w-[33.333333%]">
            {!order ? (
              <div className="flex flex-col justify-between h-full">
                {sideSliders.map((banner) => (
                  <MainBanner key={banner.id} {...banner} />
                ))}
              </div>
            ) : (
              <OrderInformation order={order.data} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
