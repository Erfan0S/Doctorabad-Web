import { api } from "../../../../api/Api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import styles from "./VerifyCode.module.scss";

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
    <div className={styles.VerifyContent}>
      <input
        placeholder="کد تایید کتاب"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button disabled={!code} onClick={submit}>
        ثبت
      </button>
    </div>
  );
};
