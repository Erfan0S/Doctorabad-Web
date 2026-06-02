import { api } from "../../../api/Api";
import { routePath } from "@repo/core/constants/routePath";
import { cartActions } from "@repo/core/states/cart";
import { modalActions } from "@repo/core/modal/modals";
import { RegisterStep, RegisterStepProps } from "../../types/register";
import { setAuthCookie } from "@repo/core/utils/authUtils";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";

import { RefObject, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { VerifyCodeType } from "@repo/core/types/register";

const codeLength = 4;

const periodMinute = 2;

export const getResendPeriod = () => Date.now() + 1000 * 60 * periodMinute;

export const useVerifyPhone = (
  { phone, setStep, changePhone, onVerifySuccess }: RegisterStepProps,
  wrapperRef: RefObject<HTMLInputElement>,
) => {
  const queryClient = useQueryClient();

  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  const [code, setCode] = useState(new Array(codeLength).fill(""));
  const [resendPeriod, setResendPeriod] = useState<{
    [key in VerifyCodeType]: number;
  }>({
    [VerifyCodeType.MOBILE]: getResendPeriod(),
    [VerifyCodeType.BALE]: Date.now(),
  });

  const [submitLoading, setSubmitLoading] = useState<{
    [key in VerifyCodeType]: boolean;
  }>({
    [VerifyCodeType.MOBILE]: false,
    [VerifyCodeType.BALE]: false,
  });

  const focusInputById = (id: string) => {
    const input = document.getElementById(id);
    if (input) input.focus();
  };

  const onChangeCode = (value: string, key: string) => {
    if (isNaN(Number(value))) return;

    setCode((code) =>
      code.map((c, index) => (index === Number(key) ? value : c)),
    );
    if (!!value) focusInputById(`${Number(key) + 1}`);
  };

  const onPasteCode = (e: ClipboardEvent) => {
    e.preventDefault();
    const copiedText = (
      e.clipboardData || (window as any).clipboardData
    ).getData("text");
    const code = copiedText.replace(/\D/g, "");
    if (code.length === 4) {
      setCode(code.split(""));
    }
  };

  const onBackSpace = (e: KeyboardEvent) => {
    const index = Number((e!.target as HTMLInputElement).id);

    if (
      (e.keyCode === 8 || e.code === "Backspace" || e.which === 8) &&
      index > 0
    ) {
      e.preventDefault();

      const value = (e.target as HTMLInputElement).value;

      onChangeCode("", String(index - (value ? 0 : 1)));

      if (!value) focusInputById(String(index - 1));
    }
  };

  useEffect(() => {
    focusInputById("0");
    const verifyInputs = wrapperRef.current!.querySelectorAll("input");

    verifyInputs.forEach((input, index) => {
      input.addEventListener("keydown", onBackSpace as EventListener);
      input.addEventListener("paste", onPasteCode as EventListener);
    });

    return () => {
      verifyInputs.forEach((input) => {
        input.removeEventListener("keydown", onBackSpace as EventListener);
        input.removeEventListener("paste", onPasteCode as EventListener);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SubmitForm = () => {
    setSubmitLoading({ ...submitLoading, [VerifyCodeType.MOBILE]: true });

    api
      .verifyPhone({ mobile: phone, code: code.join("") })
      .then(() => {
        modalActions.removeLastModal();
        setAuthCookie();

        onVerifySuccess && onVerifySuccess();
        if (pathname === routePath.register) {
          replace("/");
        } else {
          refresh();
        }
        queryClient.invalidateQueries({
          queryKey: ["messages_count", "user_club_info"],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["user-plans-clinic"],
        });
        cartActions.getCartData();
      })
      .catch((er) => {
        setCode(new Array(codeLength).fill(""));
        focusInputById("0");
      });
  };

  const resendCode = async (type: VerifyCodeType = VerifyCodeType.MOBILE) => {
    setSubmitLoading({ ...submitLoading, [type]: true });
    try {
      await api.getCsrf();
      await api.sendVerificationCode(phone, type);
      toast("کد تایید با موفقیت ارسال شد", {
        type: "success",
        position: "top-left",
      });
      setResendPeriod({
        ...resendPeriod,
        [type]: getResendPeriod(),
      });
    } catch (error) {
      setSubmitLoading({ ...submitLoading, [type]: false });
    }
  };

  const goToPrevStep = () => {
    changePhone("");
    setStep(RegisterStep.ENTER_PHONE_NUMBER);
  };

  useEffect(() => {
    if (code.join("").length === codeLength) SubmitForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return {
    code,
    resendPeriod,
    goToPrevStep,
    onChangeCode,
    resendCode,
    submitLoading,
  };
};
