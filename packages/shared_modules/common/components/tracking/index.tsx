"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import Group from "../../../assets/svg/group";

const INPUT =
  "w-full border border-solid border-orange rounded-lg leading-10 mb-3 px-3";

const BUTTON =
  "bg-orange border-0 leading-[45px] h-[45px] text-white font-semibold text-sm cursor-pointer rounded-xl mb-[-22px] px-6 relative text-center shadow-[0_3px_10px_rgba(0,0,0,0.1)] focus:outline-none active:outline-none disabled:bg-gray max-sm:mb-[-45px]";

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
    <div className="mx-auto flex w-[400px] max-w-full flex-col items-center rounded-3xl bg-white px-5 max-sm:w-[270px] max-sm:rounded-[20px] max-sm:px-6 max-sm:pb-6 max-sm:pt-4">
      <div className="mb-2 mt-[-45px] flex h-[90px] w-[90px] items-center justify-center rounded-lg bg-white p-2 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        <Group width={70} height={70} stroke="#ef631a" />
      </div>
      <label
        htmlFor="trackingCode"
        className="mb-2 text-sm font-semibold text-orange"
      >
        رهگیری
      </label>
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
        className={INPUT}
      />
      {hasError && (
        <span className="mb-2 text-red">لطفا ۲۴ رقم وارد کنید!</span>
      )}
      <button
        disabled={trackingCode.length !== 24}
        onClick={onClick}
        className={BUTTON}
      >
        رهگیری کن!
      </button>
    </div>
  );
};

export default Tracking;
