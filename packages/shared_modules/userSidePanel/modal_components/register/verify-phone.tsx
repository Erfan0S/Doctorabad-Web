"use client";
import { RegisterStepProps } from "../../types/register";
import { useEffect, useRef } from "react";
import { useVerifyPhone } from "./useVerifyPhone";
import Countdown, { CountdownRenderProps } from "react-countdown";
import style from "./Register.module.scss";
import { VerifyCodeType } from "@repo/core/types/register";

export const VerifyPhone = (props: RegisterStepProps) => {
  const wrapperRef = useRef<HTMLInputElement>(null);

  const { code, resendPeriod, onChangeCode, resendCode, goToPrevStep } =
    useVerifyPhone(props, wrapperRef);

  const resendRenderer = ({
    formatted: { minutes, seconds },
    completed,
    type = VerifyCodeType.MOBILE,
  }: CountdownRenderProps) => {
    const typeTitle =
      type === VerifyCodeType.MOBILE ? "ارسال مجدد کد" : "ارسال کد از طریق بله";

    return completed ? (
      <span onClick={() => resendCode(type)}>{typeTitle}</span>
    ) : (
      <p>
        ارسال مجدد کد {type === VerifyCodeType.MOBILE ? "" : "از طریق بله"}{" "}
        <span>{minutes}</span>:<span>{seconds}</span> دیگر{" "}
      </p>
    );
  };

  useEffect(() => {
    console.log(resendPeriod);
  }, [resendPeriod]);

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
      <Countdown
        date={resendPeriod[VerifyCodeType.MOBILE]}
        key={resendPeriod[VerifyCodeType.MOBILE]}
        renderer={(props) =>
          resendRenderer({ ...props, type: VerifyCodeType.MOBILE })
        }
      />
      <Countdown
        date={resendPeriod[VerifyCodeType.BALE]}
        key={resendPeriod[VerifyCodeType.BALE]}
        renderer={(props) =>
          resendRenderer({ ...props, type: VerifyCodeType.BALE })
        }
      />
    </div>
  );
};
