"use client";

import { RegisterStep } from "../../types/register";
import { EnterPhone } from "./enter-phone";
import { VerifyPhone } from "./verify-phone";
import { useState } from "react";
 import loginImage from "../../../assets/img/login.png";
import Image from "next/image";
import style from "./Register.module.scss";

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

  return (
    <div className={style.authWrapper}>
      <Image src={loginImage} alt="login" />
      <CurrentStepComponent
        setStep={setCurrentStep}
        phone={phone}
        changePhone={setPhone}
        onVerifySuccess={onVerifySuccess}
      />
    </div>
  );
};
