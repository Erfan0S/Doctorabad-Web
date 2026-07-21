"use client";
import ShippingItem from "./shippingItem";
import { modalActions } from "@repo/core/modal/modals";
import { ModalTypes } from "@repo/shared_modules/modalsTypes";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/Api";
import Loading from "../../../common/components/loading";
import { ShippingAddress, ShippingMethod } from "@repo/core/types/cart";
import { Apps } from "@repo/core/types/general";

// SCSS→Tailwind: was .shippingDetail li (label/value rows with the theme dot)
const detailRowClasses =
  "relative flex ps-[15px] leading-[28px] before:absolute before:right-0 before:top-[calc(50%-5px)] before:h-[10px] before:w-[10px] before:rounded before:bg-button-bg before:content-['']";

type Props = {
  isLoading: boolean;
  address: ShippingAddress | undefined;
  onChangeShippingMethod: (method: ShippingMethod) => void;
  currentShippingMethod: ShippingMethod | undefined;
  selectedShipingMethod: ShippingMethod | undefined;
  app?: Apps;
};

const Shipping = ({
  isLoading,
  address,
  onChangeShippingMethod,
  currentShippingMethod,
  selectedShipingMethod,
  app = Apps.BASE,
}: Props) => {
  const { data: shippingData, isLoading: shippingLoading } = useQuery({
    queryFn: api.getShippingMethods,
    queryKey: ["shippingItems"],
  });

  const isAddressAvailable = address && address?.address;

  const handleAddAddress = () => {
    modalActions.addModal(ModalTypes.ADD_ADDRESS, {
      initialData: address || null,
      app,
    });
  };

  return (
    <div className="market-panel relative h-full p-6 max-xl:h-auto">
      {isLoading ? (
        <Loading className="absolute bottom-1/2 left-1/2 -translate-x-1/2" />
      ) : (
        <>
          <div className="checkout-title">
            <span>اطلاعات‌من</span>
            {isAddressAvailable && (
              <small
                onClick={handleAddAddress}
                className="cursor-pointer rounded-lg bg-button-bg px-3 py-0 text-[13px] font-semibold text-white"
              >
                ویرایش آدرس
              </small>
            )}
          </div>
          {isAddressAvailable ? (
            <div className="mb-4">
              <ul className="m-0 list-none p-0">
                <li className={detailRowClasses}>
                  <span className="me-1 text-gray">گیرنده:</span>
                  <span>{address.receiver}</span>
                </li>
                <li className={detailRowClasses}>
                  <span className="me-1 text-gray">شماره همراه:</span>
                  <span>{address.mobile}</span>
                </li>
                <li className={detailRowClasses}>
                  <span className="me-1 text-gray">استان</span>
                  <span className="me-1">{address.province_title}</span>
                  <span className="me-1 text-gray">شهر</span>
                  <span>{address.city_title}</span>
                </li>
                <li className={detailRowClasses}>
                  <span className="me-1 text-gray">آدرس:</span>
                  <span>{address.address}</span>
                </li>
                <li className={detailRowClasses}>
                  <span className="me-1 text-gray">کد پستی:</span>
                  <span>{address.postal_code}</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="my-4 text-center">
              <p>برای ادامه مراحل خرید آدرس خود را ثبت کنید</p>
              <button
                onClick={handleAddAddress}
                className="relative h-[35px] cursor-pointer rounded-xl border-0 bg-button-bg px-6 py-0 text-center text-[14px] font-semibold leading-[35px] text-white shadow-[0_3px_10px_rgba(0,0,0,0.1)]"
              >
                افزودن آدرس
              </button>
            </div>
          )}
          <div>
            {shippingLoading ? (
              <Loading size={20} />
            ) : (
              shippingData?.data.data.map((shippingItem) => (
                <ShippingItem
                  key={shippingItem.id}
                  {...shippingItem}
                  onClick={onChangeShippingMethod}
                  active={currentShippingMethod?.id === shippingItem.id}
                  isLoading={
                    currentShippingMethod?.id !== shippingItem.id &&
                    selectedShipingMethod?.id === shippingItem.id
                  }
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Shipping;
