import { api } from "../../../../api/Api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  multiMediaId: string;
  refetchContents: () => void;
};

export const VerifyCode = ({ refetchContents, multiMediaId }: Props) => {
  const [code, setCode] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: (data: { verification_code: string; token: string }) =>
      api.verifyMultimediaContent(data),
    retry: 0,
    onSuccess: refetchContents,
  });

  const submit = () => {
    mutate({ verification_code: code, token: multiMediaId });
  };

  return (
    <div className="mx-auto w-[250px]">
      <input
        placeholder="کد تایید کتاب"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="h-10 w-full rounded-xl border-2 border-solid border-green px-3 text-center leading-10"
      />
      <button
        disabled={!code}
        onClick={submit}
        className="mt-2 block w-full cursor-pointer rounded-lg border-none bg-green p-2 text-[13px] font-semibold text-white"
      >
        ثبت
      </button>
    </div>
  );
};
