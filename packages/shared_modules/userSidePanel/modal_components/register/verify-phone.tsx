"use client";
import { RegisterStepProps } from "../../types/register";
import { useRef } from "react";
import { useVerifyPhone } from "./useVerifyPhone";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { VerifyCodeType } from "@repo/core/types/register";
import BaleIconBorder from "../../../assets/svg/baleIcon_border";
import VerifyMassageIcon from "../../../assets/svg/verifyMassageIcon";

export const VerifyPhone = (props: RegisterStepProps) => {
  const wrapperRef = useRef<HTMLInputElement>(null);

  const { code, resendPeriod, onChangeCode, resendCode, goToPrevStep } =
    useVerifyPhone(props, wrapperRef);

  interface Props extends CountdownRenderProps {
    type: VerifyCodeType;
  }

  const resendRenderer = ({
    formatted: { minutes, seconds },
    completed,
    type = VerifyCodeType.MOBILE,
  }: Props) => {
    let TypeIcon = <></>;
    const typeTitle = () => {
      switch (type) {
        case VerifyCodeType.MOBILE:
          TypeIcon = <VerifyMassageIcon />;
          return "ارسال کد از طریق پیامک";
        case VerifyCodeType.BALE:
          TypeIcon = <BaleIconBorder />;
          return "ارسال کد از طریق بله";
        default:
          return null; // or some default rendering
      }
    };

    return (
      <p
        className={`text-[rgb(43,43,43)] cursor-pointer flex flex-row-reverse items-center justify-center gap-[5px] py-[5px] px-[10px] font-medium border border-solid border-[#949494] rounded-[8px] w-full min-w-[225px] mb-0 hover:text-black hover:shadow-[0_3px_10px_rgba(0,0,0,0.1)] [&_svg]:w-[15px] [&_svg]:h-[15px] ${!completed ? "!text-[#949494] cursor-default hover:!shadow-none hover:!text-[#949494]" : ""}`}
        onClick={() => completed && resendCode(type)}
      >
        {!completed && (
          <p className="rounded-[4px] py-0 px-[5px] font-semibold mb-0">
            <span>{minutes}</span>:<span>{seconds}</span>
          </p>
        )}
        {typeTitle()} {TypeIcon}
      </p>
    );

    // const typeTitle =
    //   type === VerifyCodeType.MOBILE ? "ارسال مجدد کد" : "ارسال کد از طریق بله";

    // return completed ? (
    //   <span onClick={() => resendCode(type)}>{typeTitle}</span>
    // ) : (
    //   <p>
    //     ارسال مجدد کد {type === VerifyCodeType.MOBILE ? "" : "از طریق بله"}{" "}
    //     <span>{minutes}</span>:<span>{seconds}</span> دیگر{" "}
    //   </p>
    // );
  };

  return (
    <div className="flex flex-col items-center text-center" ref={wrapperRef}>
      <p className="font-semibold mb-[12px]">کد ارسال شده به شماره {props.phone} را وارد کنین!</p>
      <div className="flex justify-center flex-row-reverse gap-x-[10px] my-[12px] mx-0">
        {code.map((c, index) => (
          <input
            key={index}
            type="tel"
            className="py-0 px-[4px] leading-[32px] rounded-[12px] text-center border-2 border-solid border-[#33cc33] tracking-[2px] text-[16px] w-[40px] focus:border-[#33cc33] focus:outline-none"
            autoComplete="one-time-code"
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

      <span onClick={goToPrevStep} className="mb-[12px] text-[#949494] cursor-pointer hover:text-[#2aaadf]">شماره‌ام را اشتباه وارد کرده‌ام!</span>
      <div className="flex flex-col gap-[10px] mb-[20px] items-center border-solid border-[#d1d1d1] border-0 border-t p-[12px]">
        <p className="font-semibold mb-0">ارسال مجدد کد از طریق:</p>
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
    </div>
  );
};
