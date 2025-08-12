import MainBanner from "./banner";
import style from "./Intro.module.scss";
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
    <section className={style.intro}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <MainSlider app={Apps.MARKET} banners={mainSliders} />
          </div>
          <div className="col-lg-4">
            {!order ? (
              <div>
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
