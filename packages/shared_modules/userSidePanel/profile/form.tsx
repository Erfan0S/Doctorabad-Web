import { Field } from "formik";

import style from "./SidePanelProfile.module.scss";
import DatePickerInput from "../../common/DatePickerInput";
import { FieldGradeSelection } from "./Field&GradeSelection";
import { ProvinceCitySelection } from "./ProvinceCitySelection";

const ProfileForm = () => {
  return (
    <>
      <div className={style.formContent}>
        <div className={style.formText}>
          <label htmlFor="fullName">اسم و فامیل</label>
          <Field type="text" id="fullName" name="name" />
        </div>
        <div className={style.formText}>
          <label htmlFor="nationalCode">کد ملی</label>
          <Field type="text" id="nationalCode" name="national_code" />
        </div>
        <div className={style.formText}>
          <label htmlFor="mobile">گوشی همراه</label>
          <Field type="text" id="mobile" name="mobile" />
        </div>
        <div className={style.formText}>
          <label htmlFor="displayName">نام نمایشی</label>
          <Field type="text" id="displayName" name="nickname" />
        </div>
        <div className={style.formText}>
          <label htmlFor="email">رایانامه</label>
          <Field type="text" id="email" name="email" />
        </div>
        <div className={style.formText}>
          <label htmlFor="email">تاریخ تولد</label>
          <DatePickerInput
            name="birthday"
            placeholder="تاریخ تولد"
            color="#00db00"
            position="left"
          />
        </div>
        <div className="row">
          <FieldGradeSelection />
          <ProvinceCitySelection />
        </div>
        <div className={style.formText}>
          <label htmlFor="address">آدرس</label>
          <Field as="textarea" id="address" name="address" />
        </div>
        <div className={style.formText}>
          <label htmlFor="postal_code">کد پستی</label>
          <Field type="text" id="postal_code" name="postal_code" />
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
