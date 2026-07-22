"use client";

import { RegisterStep } from "../../types/register";
import { EnterPhone } from "./enter-phone";
import { VerifyPhone } from "./verify-phone";
import { useState } from "react";
 import loginImage from "../../../assets/img/login.png";
 import loginImageSecret from "../../../assets/img/login-secret.png";
import Image from "next/image";

type Props = {
  onVerifySuccess?: () => void;
};
export const Register = ({ onVerifySuccess }: Props) => {
  const [currentStep, setCurrentStep] = useState(
    RegisterStep.ENTER_PHONE_NUMBER
  );

  const [phone, setPhone] = useState("");

  const registerStepsComponents = {
    [RegisterStep.ENTER_PHONE_NUMBER]: EnterPhone,
    [RegisterStep.VERIFY_PHONE_NUMBER]: VerifyPhone,
  };

  const CurrentStepComponent = registerStepsComponents[currentStep];

  const imageSrc =
  currentStep === RegisterStep.ENTER_PHONE_NUMBER
    ? loginImage
    : loginImageSecret;

  return (
    <div className="w-[400px] max-w-full mx-auto my-0 pt-[40px] px-[40px] pb-0 bg-white flex flex-col items-center rounded-[24px] max-sm:w-full max-sm:min-h-[385px] max-sm:pt-[16px] max-sm:px-[24px] max-sm:pb-[24px]">
      <Image src={imageSrc} alt="login" className="w-[270px] h-auto mb-[40px]" />
      <CurrentStepComponent
        setStep={setCurrentStep}
        phone={phone}
        changePhone={setPhone}
        onVerifySuccess={onVerifySuccess}
      />
    </div>
  );
};
