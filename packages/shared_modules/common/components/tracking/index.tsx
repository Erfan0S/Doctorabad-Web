"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import style from "./Tracking.module.scss";
import Group from "../../../assets/svg/group";

interface Props {
  closeModal: (clearModals?: boolean | undefined) => void;
}

const Tracking: React.FC<Props> = ({ closeModal }) => {
  const [trackingCode, setTrackingCode] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  const onClick = () => {
    const url = `https://tracking.post.ir/?id=${trackingCode}`;
    window.open(url, "_blank");
    closeModal();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/^[0-9]*$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingCode((prev) =>
      e.target.value.length <= 24 ? e.target.value : prev,
    );
    setHasError(e.target.value.length > 0 && e.target.value.length < 24);
  };

  return (
    <div className={style.trackingModal}>
      <div className={style.trackingModalImage}>
        <Group width={70} height={70} stroke="#ef631a" />
      </div>
      <label htmlFor="trackingCode">رهگیری</label>
      <input
        autoComplete="off"
        type="text"
        pattern="[0-9]*"
        id="trackingCode"
        name="trackingCode"
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={trackingCode}
        placeholder="کد رهگیری رو وارد کنین ..."
      />
      {hasError && (
        <span className={style.trackingModalError}>لطفا ۲۴ رقم وارد کنید!</span>
      )}
      <button disabled={trackingCode.length !== 24} onClick={onClick}>
        رهگیری کن!
      </button>
    </div>
  );
};

export default Tracking;
