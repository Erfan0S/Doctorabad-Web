import { string } from 'yup';

export const mobileValidator = string()
  .required('شماره موبایل خود را وارد کنید')
  .length(11, 'شماره موبایل باید 11 رقم باشد')
  .test('check phone number validity', 'لطفا شماره موبایل خود را به درستی وارد کنید', (value) =>
    value.startsWith('09')
  );
