import { api } from "../../api/Api";
import { ShippingAddress } from "@repo/core/types/cart";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, useFormikContext } from "formik";

const FORM_SELECT =
  "mb-2 [&_input]:h-10 [&_input]:w-full [&_input]:rounded-xl [&_input]:border-2 [&_input]:border-solid [&_input]:border-green-base [&_input]:px-3 [&_input]:leading-10 [&_select]:h-10 [&_select]:w-full [&_select]:rounded-xl [&_select]:border-2 [&_select]:border-solid [&_select]:border-green-base [&_select]:px-3 [&_select]:leading-10";

export const ProvinceCitySelection = () => {
  const { values } = useFormikContext<ShippingAddress>();

  const { data: province, isLoading: provincesLoading } = useQuery({
    queryFn: api.getProvincesList,
    queryKey: ["provinces"],
    staleTime: Infinity,
  });

  const {
    data: cities,
    isLoading: citiesLoading,
    fetchStatus,
  } = useQuery({
    queryFn: () => api.getCitiesList(Number(values.province_id)),
    queryKey: ["provinces", values.province_id],
    enabled: !!values.province_id,
    staleTime: Infinity,
  });

  const waitingToSelectProvince =
    fetchStatus === "idle" && !cities?.data.data.length;

  return (
    <>
      <div className="relative w-full px-[15px] flex-[0_0_50%] max-w-[50%]">
        <div className={FORM_SELECT}>
          <Field
            defaultValue={values.province_id}
            as="select"
            name="province_id"
            placeholder="استان"
            disabled={provincesLoading}
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
      </div>
      <div className="relative w-full px-[15px] flex-[0_0_50%] max-w-[50%]">
        <div className={FORM_SELECT}>
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
      </div>
    </>
  );
};
