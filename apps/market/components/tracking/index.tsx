"use client";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import Group from "@/assets/svg/group";

// was Tracking.module.scss. Dropped as dead: the .loading spinner block (never
// rendered by this component) and a `box-sizing: unset` hover typo.
const MODAL =
  "w-[400px] max-w-full mx-auto px-5 py-0 bg-white flex flex-col items-center rounded-3xl max-sm:w-[270px] max-sm:rounded-[20px] max-sm:pt-4 max-sm:px-6 max-sm:pb-6";
const IMAGE =
  "w-[90px] h-[90px] bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)] p-2 flex items-center justify-center mt-[-45px] mb-2";
const INPUT =
  "w-full border border-solid border-orange leading-10 rounded-lg mb-3 px-3 py-0";
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
      e.target.value.length <= 24 ? e.target.value : prev
    );
    setHasError(e.target.value.length > 0 && e.target.value.length < 24);
  };

  return (
    <div className={MODAL}>
      <div className={IMAGE}>
        <Group width={70} height={70} stroke="#ef631a" />
      </div>
      <label className="text-sm font-semibold mb-2 text-orange" htmlFor="trackingCode">
        رهگیری
      </label>
      <input
        autoComplete="off"
        type="text"
        pattern="[0-9]*"
        id="trackingCode"
        name="trackingCode"
        className={INPUT}
        onKeyDown={onKeyDown}
        onChange={onChange}
        value={trackingCode}
        placeholder="کد رهگیری رو وارد کنین ..."
      />
      {hasError && (
        <span className="mb-2 text-red">لطفا ۲۴ رقم وارد کنید!</span>
      )}
      <button
        className={BUTTON}
        disabled={trackingCode.length !== 24}
        onClick={onClick}
      >
        رهگیری کن!
      </button>
    </div>
  );
};

export default Tracking;
