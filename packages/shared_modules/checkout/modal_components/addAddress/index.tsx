"use client";

import { ShippingAddress } from "@repo/core/types/cart";

import { ErrorMessage, Field, Formik } from "formik";
import { ProvinceCitySelection } from "./ProvinceCitySelection";
import Loading from "../../../common/components/loading";
import { shippingAddressValidator } from "@repo/core/constants/validators/userValidator";
import { isServerSide } from "@repo/core/constants/constants";
import { useLoadHeavyModule } from "@repo/core/hooks/useLoadHeavyModule";
import { Apps } from "@repo/core/types/general";

// SCSS→Tailwind: descendant rules kept as [&_...] variants because
// ProvinceCitySelection renders its own labels/selects and ErrorMessage
// renders the p elements (they were styled by .addAddress descendant
// selectors in the old scss).
const addAddressClasses = [
  "mx-auto flex max-h-[90vh] w-[400px] max-w-full flex-col rounded-3xl bg-white px-5 pb-0 pt-5",
  "max-sm:w-[95%] max-sm:rounded-[20px] max-sm:px-6 max-sm:pb-6 max-sm:pt-4",
  "[@media(max-height:576px)]:overflow-scroll [@media(max-height:576px)]:pb-2",
  "[&_p]:-mt-2 [&_p]:mb-3 [&_p]:text-red",
  "[&_label]:mb-0.5 [&_label]:ms-0.5",
  "[&_input]:mb-2 [&_input]:h-[37px] [&_input]:w-full [&_input]:rounded-lg [&_input]:border-2 [&_input]:border-solid [&_input]:border-[#c6c6c6] [&_input]:px-3 [&_input]:py-0 [&_input]:leading-[35px] [&_input]:text-black [&_input]:outline-none [&_input:focus]:border-app-base",
  "[&_select]:mb-2 [&_select]:h-[37px] [&_select]:w-full [&_select]:rounded-lg [&_select]:border-2 [&_select]:border-solid [&_select]:border-[#c6c6c6] [&_select]:px-3 [&_select]:py-0 [&_select]:leading-[35px] [&_select]:text-black [&_select]:outline-none [&_select:focus]:border-app-base",
  "[&_textarea]:mb-3 [&_textarea]:min-h-[80px] [&_textarea]:w-full [&_textarea]:rounded-lg [&_textarea]:border-2 [&_textarea]:border-solid [&_textarea]:border-[#c6c6c6] [&_textarea]:px-3 [&_textarea]:py-1 [&_textarea]:leading-[25px] [&_textarea]:outline-none [&_textarea:focus]:border-app-base",
].join(" ");

type Props = {
  initialData: Partial<ShippingAddress> | null;
  submit: (data: Partial<ShippingAddress>) => void;
  isLoading: boolean;
  app?: Apps;
};
const defaultInitialData = {
  receiver: "",
  mobile: "",
  national_code: "",
  province_id: "",
  city_id: "",
  urban_area: "",
  address: "",
  postal_code: "",
  longitude: "",
  latitude: "",
};
const AddAddress = ({
  initialData,
  submit,
  isLoading,
  app = Apps.BASE,
}: Props) => {
  const [Map, loadingMap] = useLoadHeavyModule(() => import("./map"));

  if (isServerSide) return null;

  return (
    <Formik
      initialValues={
        initialData
          ? { ...defaultInitialData, ...initialData }
          : defaultInitialData
      }
      onSubmit={(data) => {
        submit(data as Partial<ShippingAddress>);
      }}
      validationSchema={shippingAddressValidator}
    >
      {({ submitForm }) => (
        <div className={`${addAddressClasses} ${app}`}>
          {/* <div className={style.addAddressMap}>
            {!loadingMap && Map ? <Map /> : <Loading size={15} />}
          </div> */}
          <ErrorMessage name="latitude" component="p" />
          <div className="row">
            <div className="col-lg-12">
              <label>شماره همراه</label>
              <Field type="text" name="mobile" placeholder="شماره همراه" />
              <ErrorMessage name="mobile" component="p" />
            </div>
            <div className="col-lg-6">
              <label>گیرنده</label>
              <Field type="text" name="receiver" placeholder="گیرنده" />
              <ErrorMessage name="receiver" component="p" />
            </div>

            <div className="col-lg-6">
              <label>کد پستی</label>
              <Field type="text" name="postal_code" placeholder="کد پستی" />
              <ErrorMessage name="postal_code" component="p" />
            </div>
            <ProvinceCitySelection />
            <div className="col-lg-12">
              <label>آدرس</label>
              <Field
                as="textarea"
                name="address"
                placeholder="آدرس دقیق"
              ></Field>
              <ErrorMessage name="address" component="p" />
            </div>
          </div>
          <button
            onClick={submitForm}
            className="relative -mb-[22px] h-[45px] cursor-pointer rounded-xl border-0 bg-button-bg px-6 py-0 text-center text-[14px] font-semibold leading-[45px] text-white shadow-[0_3px_10px_rgba(0,0,0,0.1)] focus:shadow-none focus:outline-none active:shadow-none active:outline-none disabled:cursor-default disabled:bg-gray disabled:shadow-none max-sm:mb-0"
          >
            {isLoading ? <Loading size={8} /> : "ثبت آدرس"}
          </button>
        </div>
      )}
    </Formik>
  );
};

export default AddAddress;
