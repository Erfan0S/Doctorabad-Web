import { api } from "../../../api/Api";
import { ShippingAddress } from "@repo/core/types/cart";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, useFormikContext } from "formik";
import { useEffect, useState } from "react";

export const ProvinceCitySelection = () => {
  const { values, setFieldValue } = useFormikContext<ShippingAddress>();
  const [currentProvince, setCurrentProvince] = useState(
    values.province_id?.toString()
  );

  const { data: province, isLoading: provincesLoading } = useQuery({
    queryFn: api.getProvincesList,
    queryKey: ["provinces"],
    staleTime: Infinity,
  });

  useEffect(() => {
    if (currentProvince != values.province_id?.toString) {
      setFieldValue("city_id", null);
    }
  }, [currentProvince, setCurrentProvince]);

  const {
    data: cities,
    isLoading: citiesLoading,
    fetchStatus,
  } = useQuery({
    queryFn: () => api.getTopinCitiesList(Number(values.province_id)),
    queryKey: ["provinces", values.province_id],
    enabled: !!values.province_id,
    staleTime: Infinity,
  });

  const waitingToSelectProvince =
    fetchStatus === "idle" && !cities?.data.data.length;

  return (
    <>
      <div className="col-lg-6">
        <label>استان</label>
        <Field
          defaultValue={values.province_id}
          as="select"
          name="province_id"
          placeholder="استان"
          disabled={provincesLoading}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFieldValue("province_id", e.target.value);
            setCurrentProvince(e.target.value);
          }}
        >
          {provincesLoading ? (
            <option value="">در حال دریافت استان ها</option>
          ) : (
            <>
              <option value="">استان را انتخاب کنید</option>
              {province?.data.data.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </>
          )}
        </Field>
        <ErrorMessage name="province_id" component="p" />
      </div>
      <div
        className="col-lg-6"
        key={String(citiesLoading || waitingToSelectProvince)}
      >
        <label>شهر</label>
        <Field
          as="select"
          name="city_id"
          placeholder="شهر"
          defaultValue={values.city_id}
          disabled={citiesLoading || waitingToSelectProvince}
        >
          {waitingToSelectProvince ? (
            <option value="">ابتدا استان را انتخاب کنید</option>
          ) : citiesLoading ? (
            <option value="">در حال دریافت شهر ها</option>
          ) : (
            <>
              <option value="">شهر را انتخاب کنید</option>
              {cities?.data.data.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  selected={String(p.id) === String(values.city_id)}
                >
                  {p.title}
                </option>
              ))}
            </>
          )}
        </Field>
        <ErrorMessage name="city_id" component="p" />
      </div>
    </>
  );
};
