import { Field } from "formik";

import DatePickerInput from "../../common/components/DatePickerInput";
import { FieldGradeSelection } from "./Field&GradeSelection";
import { ProvinceCitySelection } from "./ProvinceCitySelection";

const FORM_TEXT =
  "mb-5 mt-3 flex flex-col items-center rounded-lg px-2 pb-2 pt-0 shadow-[0_2px_4px_rgba(0,0,0,0.1)] [&_label]:-mt-3 [&_label]:w-[120px] [&_label]:rounded-lg [&_label]:bg-green-base [&_label]:text-center [&_label]:font-medium [&_label]:leading-6 [&_label]:text-white [&_input]:w-full [&_input]:border-none [&_input]:bg-transparent [&_input]:p-0 [&_input]:text-center [&_input]:text-[13px] [&_input]:leading-[25px] [&_input:disabled]:text-gray [&_input:focus]:outline-none [&_input:active]:outline-none [&_textarea]:w-full [&_textarea]:border-none [&_textarea]:bg-transparent [&_textarea]:p-0 [&_textarea]:text-center [&_textarea]:text-[13px] [&_textarea]:leading-[25px] [&_textarea:disabled]:text-gray [&_textarea:focus]:outline-none [&_textarea:active]:outline-none";

const ProfileForm = () => {
  return (
    <div>
      <div className={FORM_TEXT}>
        <label htmlFor="fullName">اسم و فامیل</label>
        <Field type="text" id="fullName" name="name" />
      </div>
      <div className={FORM_TEXT}>
        <label htmlFor="nationalCode">کد ملی</label>
        <Field type="text" id="nationalCode" name="national_code" />
      </div>
      <div className={FORM_TEXT}>
        <label htmlFor="mobile">گوشی همراه</label>
        <Field type="text" id="mobile" name="mobile" />
      </div>
      <div className={FORM_TEXT}>
        <label htmlFor="displayName">نام نمایشی</label>
        <Field type="text" id="displayName" name="nickname" />
      </div>
      <div className={FORM_TEXT}>
        <label htmlFor="email">رایانامه</label>
        <Field type="text" id="email" name="email" />
      </div>
      <div className={FORM_TEXT}>
        <label htmlFor="student_id">
          شماره دانشجویی/
          <br />
          شماره نظام
        </label>
        <Field type="text" id="student_id" name="student_id" />
      </div>
      <div className={FORM_TEXT}>
        <label htmlFor="birthday">تاریخ تولد</label>
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
      <div className={FORM_TEXT} style={{ marginTop: "15px" }}>
        <label htmlFor="address">آدرس</label>
        <Field as="textarea" id="address" name="address" />
      </div>
      <div className={FORM_TEXT}>
        <label htmlFor="postal_code">کد پستی</label>
        <Field type="text" id="postal_code" name="postal_code" />
      </div>
    </div>
  );
};

export default ProfileForm;
