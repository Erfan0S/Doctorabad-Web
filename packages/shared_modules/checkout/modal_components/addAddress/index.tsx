"use client";

import { ShippingAddress } from "@repo/core/types/cart";
import style from "./AddAddress.module.scss";

import { ErrorMessage, Field, Formik } from "formik";
import { ProvinceCitySelection } from "./ProvinceCitySelection";
import Loading from "../../../common/components/loading";
import { shippingAddressValidator } from "@repo/core/constants/validators/userValidator";
import { isServerSide } from "@repo/core/constants/constants";
import { useLoadHeavyModule } from "@repo/core/hooks/useLoadHeavyModule";

type Props = {
  initialData: Partial<ShippingAddress> | null;
  submit: (data: Partial<ShippingAddress>) => void;
  isLoading: boolean;
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
const AddAddress = ({ initialData, submit, isLoading }: Props) => {
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
        <div className={style.addAddress}>
          <div className={style.addAddressMap}>
            {!loadingMap && Map ? <Map /> : <Loading size={15} />}
          </div>
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
          <button onClick={submitForm}>
            {isLoading ? <Loading size={8} /> : "ثبت آدرس"}
          </button>
        </div>
      )}
    </Formik>
  );
};

export default AddAddress;
