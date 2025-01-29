import { api } from "@repo/shared_modules/api";
import { enterPhoneNumberValidator } from "@repo/core/constants";
import { RegisterStep, RegisterStepProps } from "../../types/register";
import { Formik, Form, Field, FormikHelpers } from "formik";
import style from "./Register.module.scss";
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
    console.log(phone);
    setSubmitting(true);
    try {
      await api.getCsrf();
      await api.sendVerificationCode(phone);
      onCodeSent(phone);
      console.log("code sent");
    } catch (error: any) {
      if (error?.status && error.status === 422) {
        onCodeSent(phone);
      }
      setSubmitting(false);
      console.log(error);
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
          <Form className={style.enterPhoneForm}>
            <label htmlFor="phone">شماره موبایلتون چند بود!؟</label>
            <Field
              name="phone"
              id="phone"
              placeholder="_ _ _ _ _ _ _ _ _ _ _"
            />
            <button
              type="submit"
              className={isSubmitting ? style.loading : ""}
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
