import { number, object, string } from "yup";
import { mobileValidator } from "./generalValidators";

export const enterPhoneNumberValidator = object().shape({
  phone: mobileValidator,
});

export const shippingAddressValidator = object().shape({
  receiver: string().required("نام گیرنده اجباری است"),
  province_id: string().required("استان را انتخاب کنید"),
  city_id: string().required("شهر را انتخاب کنید"),
  address: string().required("ادرس خود را وارد کنید"),
  latitude: number().optional(),
  postal_code: string()
    .required("کد پستی خود را وارد کنید")
    .length(10, "کد پستی شامل 10 رقم است"),
  mobile: mobileValidator,
});

export const profileValidation = object().shape({
  mobile: mobileValidator,
  national_code: string().nullable().length(10, "شماره ملی باید 10 رقم باشد"),
  field_id: string().required("رشته خود را انتخاب کنید"),
  grade_id: string().required("مقطع خود را انتخاب کنید"),
});
