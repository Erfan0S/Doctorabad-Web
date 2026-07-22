import { api } from "@repo/shared_modules/api";
import { enterPhoneNumberValidator } from "@repo/core/constants/validators/userValidator";
import { RegisterStep, RegisterStepProps } from "../../types/register";
import { Formik, Form, Field, FormikHelpers } from "formik";
interface Form {
  phone: string;
}

export const EnterPhone = ({
  setStep,
  changePhone,
  phone,
}: RegisterStepProps) => {
  const onCodeSent = (phone: string) => {
    setStep(RegisterStep.VERIFY_PHONE_NUMBER);

    changePhone(phone);
  };

  const submit = async (
    { phone }: Form,
    { setSubmitting }: FormikHelpers<Form>
  ) => {
    setSubmitting(true);
    try {
      const csrf = await api.getCsrf();
      await api.sendVerificationCode(phone);
      onCodeSent(phone);
    } catch (error: any) {
      if (error?.status && error.status === 422) {
        onCodeSent(phone);
      }
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ phone: phone }}
      validationSchema={enterPhoneNumberValidator}
      validateOnChange
      onSubmit={submit}
    >
      {({ isSubmitting, errors }) => {
        return (
          <Form className="flex flex-col items-center">
            <label htmlFor="phone" className="leading-[26px] -mb-[13px] bg-white py-0 px-[8px] relative z-[2] font-semibold">شماره موبایلتون چند بود!؟</label>
            <Field
              name="phone"
              id="phone"
              placeholder="_ _ _ _ _ _ _ _ _ _ _"
              className="pt-[8px] px-[16px] pb-0 leading-[32px] mb-[20px] rounded-[12px] text-center border-2 border-solid border-[#33cc33] tracking-[2px] text-[16px] focus:border-[#33cc33] focus:outline-none"
            />
            <button
              type="submit"
              className={`bg-[var(--button-bg)] border-0 leading-[45px] h-[45px] text-white font-semibold text-[14px] cursor-pointer rounded-[12px] -mb-[22px] px-[40px] py-0 relative text-center min-w-[175px] shadow-[0_3px_10px_rgba(0,0,0,0.1)] focus:outline-none focus:shadow-none active:outline-none active:shadow-none disabled:bg-[#949494] disabled:cursor-default disabled:outline-none disabled:shadow-none max-sm:mb-0${isSubmitting ? " before:content-[''] before:absolute before:left-[calc(50%-13px)] before:top-[calc(50%-13px)] before:w-[26px] before:h-[26px] before:border-[3px] before:border-solid before:[border-color:#fff_#fff_transparent] before:rounded-[13px] before:animate-[spinner_0.75s_linear_infinite]" : ""}`}
              disabled={Boolean(isSubmitting || errors.phone)}
            >
              {!isSubmitting && "ورود به کلبه من"}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
