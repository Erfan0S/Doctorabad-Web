import { RegisterStepProps } from '@/types/register';
import { useRef } from 'react';
import { useVerifyPhone } from './useVerifyPhone';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import style from './Register.module.scss';

export const VerifyPhone = (props: RegisterStepProps) => {
  const wrapperRef = useRef<HTMLInputElement>(null);

  const { code, resendPeriod, onChangeCode, resendCode, goToPrevStep } = useVerifyPhone(props, wrapperRef);

  const resendRenderer = ({ formatted: { minutes, seconds }, completed }: CountdownRenderProps) => {
    return completed ? (
      <span onClick={resendCode}>ارسال مجدد کد</span>
    ) : (
      <p>
        ارسال مجدد کد <span>{minutes}</span>:<span>{seconds}</span> دیگر
      </p>
    );
  };

  return (
    <div className={style.verifyPhoneForm} ref={wrapperRef}>
      <p>کد ارسال شده به شماره {props.phone} را وارد کنین!</p>
      <div className={style.verifyPhoneFormInputs}>
        {code.map((c, index) => (
          <input
            key={index}
            type="tel"
            autoComplete="off"
            min={0}
            max={1}
            id={index.toString()}
            value={c}
            onChange={(e) => {
              const { id, value } = e.target;
              onChangeCode(value, id);
            }}
          />
        ))}
      </div>
      <span onClick={goToPrevStep}>شماره‌ام را اشتباه وارد کرده‌ام!</span>
      <Countdown date={resendPeriod} key={resendPeriod} renderer={resendRenderer} />
    </div>
  );
};
